import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailVerify } from 'src/entities/email_auth.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          auth: {
            user: configService.get('MAIL_SENDER_ADDRESS'),
            pass: configService.get('MAIL_SENDER_PASSWORD'),
          },
        },
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([EmailVerify, User]),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
