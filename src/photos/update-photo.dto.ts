import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdatePhotoDto {
    @IsOptional()
    @IsString()
    alt?: string;

    @IsOptional()
    @IsBoolean()
    isPublic?: boolean;
}
