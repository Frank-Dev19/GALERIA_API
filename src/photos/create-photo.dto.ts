import { IsNotEmpty, IsString, IsOptional, IsInt, IsBoolean } from 'class-validator';

export class CreatePhotoDto {
    @IsNotEmpty()
    @IsString()
    src: string; // URL de la foto (antes imageUrl)

    @IsOptional()
    @IsString()
    alt?: string; // Texto alternativo (antes caption)

    @IsNotEmpty()
    @IsInt()
    albumId: number;

    @IsOptional()
    @IsBoolean()
    isPublic?: boolean; // Control de visibilidad
}
