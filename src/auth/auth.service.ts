import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    logout(user: any) {
        // do nothing
        // jwt token is cleared in client side
    }

    async getUser(user: Partial<User>) {
        return await this.usersRepository.findOne({ where: { id: user.id } });
    }

    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) { }

    // 生成token
    createToken(user: Partial<User>) {
        return this.jwtService.sign(user);
    }

    async login(user: Partial<User>) {
        const token = this.createToken({
            id: user.id,
            username: user.username,
            role: user.role,
        });
        // console.log('token', token);
        return token;
    }
}
