import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreatePhotoDto {
    @IsNotEmpty()
    @IsString()
    imageUrl: string;

    @IsOptional()
    @IsString()
    caption?: string;

    @IsNotEmpty()
    albumId: number;
}
