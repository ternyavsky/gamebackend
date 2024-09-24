import { IsEmail } from 'class-validator';

export class ForgotPasswordDTO {
    @IsEmail()
    public email: string;
}
