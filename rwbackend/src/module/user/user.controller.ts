import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDTO } from 'src/dto/signup.dto';

@UsePipes(ValidationPipe)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() signUpDTO: SignUpDTO) {
    return this.userService.signUp(signUpDTO);
  }
}
