import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Album } from '../albums/albums.entity';

@Entity('photos')
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    src: string; // 👈 antes era imageUrl

    @Column({ nullable: true })
    alt: string; // 👈 antes era caption

    @ManyToOne(() => Album, album => album.photos, { onDelete: 'CASCADE' })
    album: Album;

    @Column({ default: 0 })
    likes: number;

    @Column({ default: true })
    isPublic: boolean;

    @CreateDateColumn()
    uploadDate: Date; // 👈 antes era createdAt

}
