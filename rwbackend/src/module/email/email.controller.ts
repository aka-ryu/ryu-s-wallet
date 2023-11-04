import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailDTO } from 'src/dto/email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @UsePipes(ValidationPipe)
  @Post('send/verifycode')
  async sendEmailVerifyCode(@Body() emailDTO: EmailDTO) {
    return this.emailService.sendEmailVerifyCode(emailDTO);
  }
}
