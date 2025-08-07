import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Album } from '../albums/albums.entity';

@Entity('photos')
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    imageUrl: string;

    @Column({ nullable: true })
    caption: string;

    @ManyToOne(() => Album, album => album.photos, { onDelete: 'CASCADE' })
    album: Album;

    @CreateDateColumn()
    createdAt: Date;
}
