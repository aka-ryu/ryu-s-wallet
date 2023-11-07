import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDTO } from 'src/dto/response.dto';
import { SignDTO } from 'src/dto/signup.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
// import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async signIn(signDTO: SignDTO) {
    const { email, password } = signDTO;
    const responseDTO = new ResponseDTO();

    const user = await this.userRepo.findOne({
      where: {
        email: email,
      },
    });

    // 존재하지 않는 아이디
    if (!user) {
      responseDTO.result = 'false';
      responseDTO.message = '존재하지 않는 아이디 입니다.';

      return responseDTO;
    }

    // 비밀번호 검증
    const isMatch = await argon2.verify(user.password, password);

    if (!isMatch) {
      responseDTO.result = 'false';
      responseDTO.message = '계정 정보가 일치하지 않습니다.';

      return responseDTO;
    }

    const payload = { email: email };
    const token = this.jwtService.sign(payload);

    responseDTO.message = '로그인 성공';
    responseDTO.data = {
      token: token,
      is_wallet: user.is_wallet === 1,
    };
    responseDTO.result = 'success';

    return responseDTO;
  }
}
