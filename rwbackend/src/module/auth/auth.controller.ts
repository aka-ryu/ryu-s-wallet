import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignDTO } from 'src/dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() signDTO: SignDTO) {
    return this.authService.signIn(signDTO);
  }
}
