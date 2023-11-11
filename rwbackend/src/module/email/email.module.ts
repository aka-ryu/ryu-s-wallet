import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailVerify } from 'src/entities/email_auth.entity';
import { User } from 'src/entities/user.entity';
import { UserService } from '../user/user.service';
import { Coffee } from 'src/entities/coffee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmailVerify, User, Coffee])],
  controllers: [EmailController],
  providers: [EmailService, UserService],
})
export class EmailModule {}
