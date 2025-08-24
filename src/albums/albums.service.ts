import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from './albums.entity';
import { CreateAlbumDto } from './create-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateAlbumsDto } from './update-albums.dto';

@Injectable()
export class AlbumsService {

    constructor(
        @InjectRepository(Album)
        private albumRepository: Repository<Album>,
    ) { }

    async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
        const album = this.albumRepository.create(createAlbumDto);
        return this.albumRepository.save(album);
    }

    findAll(): Promise<Album[]> {
        return this.albumRepository.find({
            relations: ['photos'],
            order: { createdAt: 'DESC' },
        });
    }

    // async findOne(id: number): Promise<Album> {
    //     const album = await this.albumRepository.findOne({ where: { id } });
    //     if (!album) throw new NotFoundException('Álbum no encontrado');
    //     return album;
    // }

    async findOne(id: number): Promise<Album> {
        const album = await this.albumRepository.findOne({
            where: { id },
            relations: ['photos'], // 👈 esto es lo nuevo
        });
        if (!album) throw new NotFoundException('Álbum no encontrado');

        // Incrementar vistas
        await this.albumRepository.increment({ id }, 'views', 1)

        // Refrescar valor actualizado de views
        album.views++;
        return album;
    }


    async remove(id: number): Promise<void> {
        const result = await this.albumRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Álbum no encontrado');
        }
    }

    async updateAlbums(id: number, dto: UpdateAlbumsDto) {
        const album = await this.albumRepository.findOne({ where: { id } });
        if (!album) throw new NotFoundException('Album no encontrado');

        if (dto.isPublic !== undefined) {
            album.isPublic = dto.isPublic;
        }

        return this.albumRepository.save(album);
    }

}
