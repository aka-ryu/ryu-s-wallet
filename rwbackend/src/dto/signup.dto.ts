import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDTO {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
