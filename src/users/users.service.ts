import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findByUsername(username: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { username } });
    }


    async createUser(data: { username: string; password: string; name?: string; avatar?: string }): Promise<Omit<User, 'password'>> {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = this.usersRepository.create({
            username: data.username,
            password: hashedPassword,
            name: data.name,
            avatar: data.avatar, // <-- agrega esto
        });

        const savedUser = await this.usersRepository.save(user);

        // Excluir el campo password al retornar
        const { password, ...userWithoutPassword } = savedUser;
        return userWithoutPassword;
    }

}
