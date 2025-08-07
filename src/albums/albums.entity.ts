import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Photo } from 'src/photos/photo.entity';

@Entity('albums')
export class Album {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    coverUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Photo, photo => photo.album)
    photos: Photo[];
}
