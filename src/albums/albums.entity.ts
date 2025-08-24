// src/albums/entities/album.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Photo } from 'src/photos/photo.entity';

@Entity('albums')
export class Album {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100 })
    title: string

    // Nombre del icono (p.ej. "crown", "users", etc.) para mapearlo a un componente en el frontend
    @Column({ length: 50, nullable: true })
    icon?: string

    // OJO: en tu UI usas valores tipo "from-purple-200 to-pink-300" (son largos),
    // mejor dar margen suficiente
    @Column({ length: 100, nullable: true })
    color?: string

    // Mantengo isPublic porque lo incluiste en tu último snippet; si no lo necesitas, elimínalo sin problema
    @Column({ default: true })
    isPublic: boolean

    // Contador de vistas del álbum
    @Column({ default: 0 })
    views: number

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @OneToMany(() => Photo, (photo) => photo.album, { cascade: true })
    photos: Photo[]
}
