import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthDTO, SignInDTO } from './dto/registration.dto';
import bcrypt from 'src/config/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ForgotPasswordDTO } from './dto/forgotPassword.dto';
import { MinioService } from 'src/config/s3/minio.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService,
        @Inject()
        private readonly minioService: MinioService,
        @Inject()
        private readonly usersService: UsersService,
    ) { }

    async registration(authDto: AuthDTO) {

        const checkUser = await this.usersRepository.find({ where: { name: authDto.name, email: authDto.email } })
        console.log(checkUser)
        if (checkUser.length == 0) {

            const user = this.usersRepository.create(authDto);
            user.password = await bcrypt.hash(authDto.password, 10)
            return await this.usersRepository.save(user)
        } else {
            throw new BadRequestException('User already have account')
        }

    }


    async forgotPassword(forgotPasswordDto: ForgotPasswordDTO) { }

    async singIn({ email, name, password }: SignInDTO) {
        const payload = {};
        let user = null
        if (email) {
            user = await this.usersRepository.findOneBy({ email: email })
        } else if (name) {
            user = await this.usersRepository.findOneBy({ name: name })
        }
        payload['email'] = user.email
        payload['name'] = user.name

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            throw new UnauthorizedException('No valid password')
        }
        payload['id'] = user.id
        return {
            accessToken: await this.jwtService.signAsync(payload)
        }
    }
    // if(authDto.avatar) {
    //     const path = await this.minioService.uploadFile(authDto.avatar, 'users_images');
    //     user.avatar = `${this.minioService.pathToFile}/${path}`;
    //
    // }
}
