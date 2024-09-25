import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly smtpService: MailerService) { }


    public async forgotPasswordMessage(userEmail: string, password: string) {
        await this.smtpService.sendMail({
            to: userEmail,
            from: process.env.EMAIL_USER,
            subject: 'Восстановление пароля',
            text: 'Восстановление пароля на сайте teamproject.site',
            html: `<p>Ваш пароль - <b>${password}</b></p>`,
        });
    }
}
