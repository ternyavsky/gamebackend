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
import { PusherService } from 'nestjs-pusher';
import { MailService } from 'src/config/smtp/mail.service';

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
        private readonly pusherService: PusherService,
        private readonly mailService: MailService
    ) { }

    async registration(authDto: AuthDTO) {

        const checkUser = await this.usersRepository.findOne({ where: { name: authDto.name, email: authDto.email } })
        console.log(checkUser)
        if (!checkUser) {
            let user = null
            if (!authDto.email) {
                user = this.usersRepository.create({ name: authDto.name, email: authDto.name, ...authDto });
            } else {
                user = this.usersRepository.create({ email: authDto.name, ...authDto });
            }
            this.pusherService.trigger('stats', 'newUser', 'newUser')
            return await this.usersRepository.save(user)
        }
        if (checkUser.name == checkUser.email) {
            return checkUser
        }
        else {
            throw new BadRequestException('User already have account')
        }

    }

    async setOffline(userId: string) {
        const user = await this.usersRepository.findOneBy({ id: userId })
        user.online = false
        this.pusherService.trigger('stats', 'onlineDecrease', 'onlineDecrease')
        return await this.usersRepository.save(user)
    }

    async setOnline(userId: string) {
        const user = await this.usersRepository.findOneBy({ id: userId })
        user.online = true
        this.pusherService.trigger('stats', 'onlineIncrease', 'onlineIncrease')
        return await this.usersRepository.save(user)
    }


    async forgotPassword(forgotPasswordDto: ForgotPasswordDTO) {
        console.log(forgotPasswordDto.email)
        const user = await this.usersRepository.findOneBy({ email: forgotPasswordDto.email })
        if (user) {
            this.mailService.forgotPasswordMessage(user.email, user.password)
            return user
        } else {
            throw new UnauthorizedException('No users')
        }
    }

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

        const comparePassword = password == user.password;
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
