"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./module/user/user.module");
const email_module_1 = require("./module/email/email.module");
const mailer_1 = require("@nestjs-modules/mailer");
const auth_module_1 = require("./module/auth/auth.module");
const blockchain_module_1 = require("./module/blockchain/blockchain.module");
const jwtaurh_module_1 = require("./module/jwt/jwtaurh.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
                isGlobal: true,
            }),
            mailer_1.MailerModule.forRootAsync({
                useFactory: async (configService) => ({
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
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
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
            user_module_1.UserModule,
            email_module_1.EmailModule,
            auth_module_1.AuthModule,
            blockchain_module_1.BlockchainModule,
            jwtaurh_module_1.JwtAuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map