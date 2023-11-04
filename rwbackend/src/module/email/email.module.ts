import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailCheckEntity } from 'src/entities/email_auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmailCheckEntity])],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
