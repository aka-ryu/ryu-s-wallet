import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignDTO } from 'src/dto/signup.dto';
import { PasswordDTO } from 'src/dto/password.dto';

@UsePipes(ValidationPipe)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() signDTO: SignDTO) {
    return this.userService.signUp(signDTO);
  }

  @Post('change/password')
  async changePassword(@Body() signDTO: SignDTO) {
    return this.userService.changePassword(signDTO);
  }
}
