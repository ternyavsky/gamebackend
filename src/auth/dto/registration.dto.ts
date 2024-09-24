import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class AuthDTO {
    @ApiProperty({ nullable: true })
    // @IsEmail()
    public email: string;
    @ApiProperty()
    public name: string;
    @ApiProperty()
    public password: string;
    @ApiProperty({ nullable: true })
    public vkLink: string
    @ApiProperty({ nullable: true })
    public tgLink: string
    @ApiProperty({ nullable: true })
    public avatar: string
}

export class SignInDTO {
    @ApiProperty({ nullable: true })
    // @IsEmail()
    public email: string;
    @ApiProperty()
    public name: string;
    @ApiProperty()
    public password: string;
}
