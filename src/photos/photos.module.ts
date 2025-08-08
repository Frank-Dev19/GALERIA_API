import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { Album } from 'src/albums/albums.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, Album]), CloudinaryModule],
  controllers: [PhotosController],
  providers: [PhotosService]
})
export class PhotosModule { }
