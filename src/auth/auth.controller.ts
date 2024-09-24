import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO, SignInDTO } from './dto/registration.dto';
import { ForgotPasswordDTO } from './dto/forgotPassword.dto';
import { AuthGuard } from './auth.guard';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('registration')
    async registration(@Body() authDto: AuthDTO) {
        return await this.authService.registration(authDto);
    }
    @Post('signIn')
    async singIn(@Body() singInDto: SignInDTO) {
        return await this.authService.singIn(singInDto)
    }
    @Post('forgotPassword')
    async forgotPassword(forgotPasswordDto: ForgotPasswordDTO) {
        return await this.authService.forgotPassword(forgotPasswordDto)
    }
    @UseGuards(AuthGuard)
    @Get('getMe')
    async getMe(@Request() req) {
        return req.user
    }
}
