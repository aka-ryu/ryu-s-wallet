import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/user/user.module';
import { EmailModule } from './module/email/email.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './module/auth/auth.module';
import { BlockchainModule } from './module/blockchain/blockchain.module';
import { JwtAuthModule } from './module/jwt/jwtaurh.module';
import { EthersModule, SEPOLIA_NETWORK } from 'nestjs-ethers';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './scheduler/task.service';
import { Transaction } from './entities/transaction.entity';
import { HttpModule } from '@nestjs/axios';
import { UserWallet } from './entities/wallet.entity';
import { Transactional } from './utils/transactional';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
    }),
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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    EthersModule.forRoot({
      network: SEPOLIA_NETWORK,
    }),
    UserModule,
    EmailModule,
    AuthModule,
    BlockchainModule,
    JwtAuthModule,
    TypeOrmModule.forFeature([Transaction, UserWallet]),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService, TasksService, Transactional],
})
export class AppModule {}
