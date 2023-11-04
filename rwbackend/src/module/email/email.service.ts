import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor() {}

  async sendEmailVerifyCode() {
    return { hs: 'gs' };
  }
}
