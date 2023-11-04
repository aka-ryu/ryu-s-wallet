import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { endOfDay, startOfDay } from 'date-fns';
import { EmailDTO } from 'src/dto/email.dto';
import { ResponseDTO } from 'src/dto/response.dto';
import { EmailVerify } from 'src/entities/email_auth.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class EmailService {
  constructor(
    private mailsender: MailerService,

    @InjectRepository(EmailVerify)
    private emailVerifyRepo: Repository<EmailVerify>,
  ) {}

  async sendEmailVerifyCode(emailDTO: EmailDTO) {
    const { email } = emailDTO;
    const responseDTO = new ResponseDTO();

    // 일일 5회제한 횟수 확인
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());
    const todayCount = await this.emailVerifyRepo.find({
      where: {
        email: email,
        created_at: Between(todayStart, todayEnd),
      },
    });

    if (todayCount.length > 4) {
      responseDTO.result = 'false';
      responseDTO.message = '일일 5회 횟수 제한을 초과 하였습니다.';

      return responseDTO;
    }

    const code = this.createRandomCode();

    try {
      const sendResult = await this.mailsender.sendMail({
        to: email,
        from: 'uhuhas2002@gmail.com',
        subject: `Ryus's Wallet 인증코드`,
        text: `인증코드는 ${code} 입니다.`,
      });

      // 메일 발송 성공 로직
      const emailVerify = this.emailVerifyRepo.create({
        email: email,
        code: code,
      });

      await this.emailVerifyRepo.save(emailVerify);

      responseDTO.result = 'success';
      responseDTO.message = '이메일을 확인하여 인증을 완료해주세요.';

      return responseDTO;
    } catch (error) {
      // 메일 발송 실패 로직
      console.error(error);
      responseDTO.result = 'false';
      responseDTO.message = '이메일 발송중 오류가 발생하였습니다.';

      return responseDTO;
    }
  }

  private createRandomCode(): string {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
  }
}
