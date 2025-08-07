import { Controller, Post, Get, Delete, UseGuards, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreatePhotoDto } from './create-photo.dto';
import { PhotosService } from './photos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Photo } from './photo.entity';

@Controller('photos')
export class PhotosController {

    constructor(private readonly photosService: PhotosService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    addPhoto(@Body() dto: CreatePhotoDto) {
        return this.photosService.addPhoto(dto);
    }

    @Get('album/:albumId')
    getPhotos(@Param('albumId', ParseIntPipe) albumId: number) {
        return this.photosService.getPhotosByAlbum(albumId);
    }

    @Get()
    findAll(): Promise<Photo[]> {
        return this.photosService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deletePhoto(@Param('id', ParseIntPipe) id: number) {
        return this.photosService.deletePhoto(id);
    }

}
