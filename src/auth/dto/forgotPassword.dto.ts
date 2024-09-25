import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPasswordDTO {
    // @IsEmail()
    @ApiProperty()
    public email: string;
}
