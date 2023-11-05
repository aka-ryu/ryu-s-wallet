import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { differenceInMinutes, endOfDay, startOfDay } from 'date-fns';
import { CodeDTO } from 'src/dto/code.dto';
import { EmailDTO } from 'src/dto/email.dto';
import { ResponseDTO } from 'src/dto/response.dto';
import { EmailVerify } from 'src/entities/email_auth.entity';
import { User } from 'src/entities/user.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class EmailService {
  constructor(
    private mailsender: MailerService,

    @InjectRepository(EmailVerify)
    private emailVerifyRepo: Repository<EmailVerify>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async sendEmailVerifyCode(emailDTO: EmailDTO) {
    const { email } = emailDTO;
    const responseDTO = new ResponseDTO();

    // 중복확인
    const user = await this.userRepo.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      responseDTO.message = '이미 가입된 이메일 입니다.';
      responseDTO.result = 'false';

      return responseDTO;
    }

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
      // 메일 발송
      const sendResult = await this.mailsender.sendMail({
        to: email,
        from: 'uhuhas2002@gmail.com',
        subject: `Ryus's Wallet 인증코드`,
        text: `인증코드는 ${code} 입니다.`,
      });

      // 메일 발송 성공 후 DB 저장
      const emailVerify = this.emailVerifyRepo.create({
        email: email,
        code: code,
      });

      await this.emailVerifyRepo.save(emailVerify);

      responseDTO.result = 'success';
      responseDTO.message = '이메일을 확인하여 인증을 완료해주세요.';

      return responseDTO;
    } catch (error) {
      // 메일 발송 혹은 DB 저장 실패
      console.error(error);
      responseDTO.result = 'false';
      responseDTO.message = '이메일 발송중 오류가 발생하였습니다.';

      return responseDTO;
    }
  }

  async checkEmailCode(codeDTO: CodeDTO) {
    const { code, email } = codeDTO;
    const responseDTO = new ResponseDTO();

    const emailVerify = await this.emailVerifyRepo.findOne({
      where: {
        email: email,
        is_used: 0,
      },
      order: { id: 'DESC' },
    });

    // 인증번호가 틀릴경우
    if (emailVerify.code !== code) {
      responseDTO.message = '인증번호가 틀립니다.';
      responseDTO.result = 'false';

      return responseDTO;
    }

    // 입력시간 10분제한 확인
    const isTimeout = await this.checkTimeout(emailVerify);
    if (isTimeout) {
      console.log('시간초과');
      responseDTO.message =
        '인증시간 10분이 초과하였습니다, 다시 시도해 주세요.';
      responseDTO.result = 'false';
      return responseDTO;
    }

    emailVerify.is_used = 1;
    await this.emailVerifyRepo.save(emailVerify);

    responseDTO.message = '인증에 성공하였습니다.';
    responseDTO.result = 'success';

    return responseDTO;
  }

  private createRandomCode(): string {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
  }

  private checkTimeout(emailVerify: EmailVerify): boolean {
    const now = new Date();
    const timeElapsed = differenceInMinutes(now, emailVerify.created_at);

    if (timeElapsed > 10) {
      // 10분 지남
      return true;
    } else {
      return false;
    }
  }
}
