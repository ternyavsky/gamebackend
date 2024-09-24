import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { MinioService } from 'src/config/s3/minio.service';

@Module({
    imports: [TypeOrmModule.forFeature([User]), JwtModule.register({ global: true, secret: 'Bearer', signOptions: { expiresIn: '7d' } }), UsersModule],
    controllers: [AuthController],
    providers: [AuthService, MinioService, UsersService],
})
export class AuthModule { }
