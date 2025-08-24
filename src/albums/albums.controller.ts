import { Controller, Post, Patch, Get, Param, Delete, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { Album } from './albums.entity';
import { CreateAlbumDto } from './create-album.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateAlbumsDto } from './update-albums.dto';

@Controller('albums')
export class AlbumsController {

    constructor(private readonly albumsService: AlbumsService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
        return this.albumsService.create(createAlbumDto);
    }

    @Get()
    findAll(): Promise<Album[]> {
        return this.albumsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Album> {
        return this.albumsService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.albumsService.remove(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    updatePhoto(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateAlbumsDto,
    ) {
        return this.albumsService.updateAlbums(id, dto);
    }

}
