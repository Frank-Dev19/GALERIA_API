// src/albums/dto/create-album.dto.ts
import { IsString, IsOptional, IsBoolean, MaxLength } from 'class-validator';

export class CreateAlbumDto {
    @IsString()
    @MaxLength(100)
    title: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    icon?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    color?: string;

    @IsOptional()
    @IsBoolean()
    isPublic?: boolean;
}
