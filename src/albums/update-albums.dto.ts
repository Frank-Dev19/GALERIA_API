import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateAlbumsDto {
    @IsOptional()
    @IsBoolean()
    isPublic?: boolean;
}
