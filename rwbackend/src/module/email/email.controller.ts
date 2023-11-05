import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailDTO } from 'src/dto/email.dto';
import { CodeDTO } from 'src/dto/code.dto';

@UsePipes(ValidationPipe)
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send/verifycode')
  async sendEmailVerifyCode(@Body() emailDTO: EmailDTO) {
    return this.emailService.sendEmailVerifyCode(emailDTO);
  }

  @Post('check/code')
  async checkEmailCode(@Body() codeDTO: CodeDTO) {
    return this.emailService.checkEmailCode(codeDTO);
  }
}
