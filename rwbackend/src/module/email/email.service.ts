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
import { UserService } from '../user/user.service';
import { Coffee } from 'src/entities/coffee.entity';

@Injectable()
export class EmailService {
  constructor(
    private mailsender: MailerService,
    private userService: UserService,
    @InjectRepository(EmailVerify)
    private emailVerifyRepo: Repository<EmailVerify>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Coffee)
    private coffeeRepo: Repository<Coffee>,
  ) {}

  async sendEmailVerifyCode(emailDTO: EmailDTO) {
    const { email, type } = emailDTO;
    const responseDTO = new ResponseDTO();

    // 회원가입, 비밀번호 찾기에 따른 필요 로직 수행
    const user = await this.userRepo.findOne({
      where: {
        email: email,
      },
    });

    if (type === 'signup') {
      if (user) {
        responseDTO.message = '이미 가입된 이메일 입니다.';
        responseDTO.result = 'false';

        return responseDTO;
      }
    } else if (type === 'password') {
      if (!user) {
        responseDTO.message = '존재하지 않는 회원 입니다.';
        responseDTO.result = 'false';

        return responseDTO;
      }
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
      await this.mailsender.sendMail({
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
      responseDTO.message = '오류가 발생하였습니다, 다시 시도해 주세요.';

      return responseDTO;
    }
  }

  async checkEmailCode(codeDTO: CodeDTO) {
    const { code, email, type } = codeDTO;
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

    if (type === 'signup') {
      responseDTO.message = '인증에 성공하였습니다.';
      responseDTO.result = 'success';

      return responseDTO;
    } else if (type === 'password') {
      return this.userService.changePassword(codeDTO);
    }
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

  async coffeeCode(email: string) {
    const responseDTO = new ResponseDTO();
    const user = await this.userRepo.findOne({
      where: {
        email: email,
      },
    });

    const already = await this.coffeeRepo.findOne({
      where: {
        user_id: user.id,
      },
    });

    if (already) {
      responseDTO.message = '이미 쿠폰을 받으셨습니다.';
      responseDTO.result = 'false';
      return responseDTO;
    }

    const coffeeCode = await this.coffeeRepo.findOne({
      where: {
        is_used: 0,
      },
    });

    if (!coffeeCode) {
      responseDTO.message = '선착순 수량이 소진되었습니다.';
      responseDTO.result = 'false';
      return responseDTO;
    }

    try {
      coffeeCode.is_used = 1;
      coffeeCode.user_id = user.id;

      this.coffeeRepo.save(coffeeCode);

      await this.mailsender.sendMail({
        to: email,
        from: 'uhuhas2002@gmail.com',
        subject: `Ryus's Wallet 커피 쿠폰`,
        text: `빽다방 아메리카도 코드 ${coffeeCode.code} 입니다.`,
      });

      responseDTO.message = '메일에서 쿠폰을 확인하세요.';
      responseDTO.result = 'success';

      return responseDTO;
    } catch (error) {
      responseDTO.result = 'false';
      responseDTO.message = '오류가 발생하였습니다, 다시 시도해 주세요.';

      return responseDTO;
    }
  }
}
