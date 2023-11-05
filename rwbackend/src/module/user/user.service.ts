import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDTO } from 'src/dto/response.dto';
import { SignUpDTO } from 'src/dto/signup.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}
  async signUp(signUpDTO: SignUpDTO) {
    const { email, password } = signUpDTO;
    const responseDTO = new ResponseDTO();

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(signUpDTO.password, 10);

    const user = new User();
    user.email = email;
    user.password = hashedPassword;
    user.is_social = 0;

    try {
      await this.userRepo.save(user);

      responseDTO.result = 'success';
      responseDTO.message = '회원가입에 성공하였습니다.';
    } catch (error) {
      responseDTO.result = 'false';
      responseDTO.message =
        '알수없는 이유로 회원가입에 실패하였습니다, 다시 시도해 주세요.';
    }

    return responseDTO;
  }

  async;
}
