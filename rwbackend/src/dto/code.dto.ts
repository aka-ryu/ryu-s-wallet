import { IsEmail, IsNotEmpty, IsNumberString } from 'class-validator';

export class CodeDTO {
  @IsNotEmpty()
  @IsNumberString()
  code: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
