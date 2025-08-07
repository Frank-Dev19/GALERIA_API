import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { Album } from 'src/albums/albums.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, Album])],
  controllers: [PhotosController],
  providers: [PhotosService]
})
export class PhotosModule { }
