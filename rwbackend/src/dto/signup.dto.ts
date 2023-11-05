import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignDTO {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
