import { Controller, Get, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send/verifycode')
  async sendEmailVerifyCode() {
    console.log('gd');
    return this.emailService.sendEmailVerifyCode();
  }
}
