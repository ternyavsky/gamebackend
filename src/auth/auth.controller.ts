import { BadRequestException, Body, Controller, Get, Post, Query, Req, Request, UseGuards } from '@nestjs/common';
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
    @Get('vkAuth')
    async vkCallbackAuth(@Query('code') code: string, @Query('device_id') deviceId: string) {
        console.log(code, deviceId)
    }
    @Post('forgotPassword')
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDTO) {
        if (!forgotPasswordDto.email) {
            throw new BadRequestException('No email')
        }
        return await this.authService.forgotPassword(forgotPasswordDto)
    }
    @UseGuards(AuthGuard)
    @Get('getMe')
    async getMe(@Request() req) {
        const user = await this.authService.setOnline(req.user.id)
        return user
    }

    @UseGuards(AuthGuard)
    @Get('offline')
    async offline(@Request() req) {
        const user = await this.authService.setOffline(req.user.id)
        return user
    }


}
