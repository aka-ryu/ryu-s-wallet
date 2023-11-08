import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDTO } from 'src/dto/response.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CodeDTO } from 'src/dto/code.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { SignDTO } from 'src/dto/signup.dto';
import * as argon2 from 'argon2';
@Injectable()
export class UserService {
  constructor(
    private mailsender: MailerService,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}
  async signUp(signDTO: SignDTO) {
    const { email, password } = signDTO;
    const responseDTO = new ResponseDTO();

    // 비밀번호 암호화
    const hashedPassword = await argon2.hash(password);

    const user = new User();
    user.email = email;
    user.password = hashedPassword;
    user.is_wallet = 0;

    try {
      await this.userRepo.save(user);

      responseDTO.result = 'success';
      responseDTO.message = '회원가입에 성공하였습니다.';
    } catch (error) {
      console.log(error);
      responseDTO.result = 'false';
      responseDTO.message =
        '알수없는 이유로 회원가입에 실패하였습니다, 다시 시도해 주세요.';
    }

    return responseDTO;
  }

  async changePassword(codeDTO: CodeDTO) {
    const { email } = codeDTO;
    const responseDTO = new ResponseDTO();

    const user = await this.userRepo.findOne({
      where: {
        email: email,
      },
    });

    const tempPassword = this.createRandomPassword();
    const hashedPassword = await argon2.hash(tempPassword);

    user.password = hashedPassword;

    try {
      await this.userRepo.save(user);
      //   await this.mailsender.sendMail({
      //     to: email,
      //     from: 'uhuhas2002@gmail.com',
      //     subject: `Ryus's Wallet 임시비밀번호`,
      //     text: `임시비밀번호는  ${tempPassword} 입니다.`,
      //   });
      responseDTO.message = '이메일로 임시 비밀번호를 보내드렸습니다.';
      responseDTO.result = 'success';

      return responseDTO;
    } catch (error) {
      console.error(error);

      responseDTO.message = '오류가 발생하였습니다, 다시 시도해 주세요.';
      responseDTO.result = 'false';

      return responseDTO;
    }
  }

  private createRandomPassword(): string {
    const min = 10000000;
    const max = 99999999;
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
  }
}
