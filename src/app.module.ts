import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AlbumsModule } from './albums/albums.module';
import { PhotosModule } from './photos/photos.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // o el host de tu servidor
      port: 3306,
      username: 'root',
      password: 'programador16',
      database: 'galeria',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // solo en desarrollo
    }),
    ConfigModule.forRoot({ isGlobal: true }), // para leer .env
    AuthModule,
    UsersModule,
    AlbumsModule,
    PhotosModule,
    CloudinaryModule,
  ]
})
export class AppModule { }
