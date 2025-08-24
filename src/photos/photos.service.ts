import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { CreatePhotoDto } from './create-photo.dto';
import { Album } from 'src/albums/albums.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UpdatePhotoDto } from './update-photo.dto';


@Injectable()
export class PhotosService {

    constructor(
        @InjectRepository(Photo)
        private photoRepo: Repository<Photo>,
        @InjectRepository(Album)
        private albumRepo: Repository<Album>,
        private cloudinaryService: CloudinaryService
    ) { }

    async uploadPhoto(file: Express.Multer.File, albumId: number) {
        if (!file) {
            throw new BadRequestException('No se envió ninguna imagen');
        }

        const uploadResult = await this.cloudinaryService.uploadImage(file);
        return this.addPhoto({
            src: uploadResult.secure_url,
            albumId
        });
    }


    async addPhoto(dto: CreatePhotoDto) {
        const album = await this.albumRepo.findOne({ where: { id: dto.albumId } });
        if (!album) throw new NotFoundException('Álbum no encontrado');

        const photo = this.photoRepo.create({
            src: dto.src,
            alt: dto.alt,
            album,
            isPublic: dto.isPublic ?? true, // por defecto público
        });

        return this.photoRepo.save(photo);
    }

    async getPhotosByAlbum(albumId: number) {
        return this.photoRepo.find({
            where: { album: { id: albumId } },
            order: { uploadDate: 'DESC' },
        });
    }

    findAll(): Promise<Photo[]> {
        return this.photoRepo.find({
            order: { uploadDate: 'DESC' },
        });
    }

    async deletePhoto(id: number) {
        const photo = await this.photoRepo.findOne({ where: { id } });
        if (!photo) throw new NotFoundException('Foto no encontrada');
        await this.photoRepo.remove(photo);
        return { message: 'Foto eliminada con éxito' };
    }


    async updatePhoto(id: number, dto: UpdatePhotoDto) {
        const photo = await this.photoRepo.findOne({ where: { id } });
        if (!photo) throw new NotFoundException('Foto no encontrada');

        if (dto.alt !== undefined) {
            photo.alt = dto.alt;
        }
        if (dto.isPublic !== undefined) {
            photo.isPublic = dto.isPublic;
        }

        return this.photoRepo.save(photo);
    }


}
