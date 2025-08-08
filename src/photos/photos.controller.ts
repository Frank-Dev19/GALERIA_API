import { Controller, Post, Get, Delete, UseGuards, UseInterceptors, UploadedFile, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreatePhotoDto } from './create-photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotosService } from './photos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Photo } from './photo.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('photos')
export class PhotosController {

    constructor(
        private readonly photosService: PhotosService,
        private readonly cloudinaryService: CloudinaryService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadPhoto(
        @UploadedFile() file: Express.Multer.File,
        @Body('albumId', ParseIntPipe) albumId: number,
    ) {
        return this.photosService.uploadPhoto(file, albumId);
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
