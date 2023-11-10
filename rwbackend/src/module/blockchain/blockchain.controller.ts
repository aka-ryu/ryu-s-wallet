import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { JwtAuthGuard } from 'src/guards/jwt.authguard';

@UseGuards(JwtAuthGuard)
@Controller('blockchain')
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get('wallet/create')
  async walletCreate(@Req() req) {
    return this.blockchainService.walletCreate(req.user.email);
  }

  @Get('wallet/disconnect')
  async walletDisconnect(@Req() req) {
    return this.blockchainService.walletDisconnect(req.user.email);
  }

  @Post('wallet/import')
  async walletImport(@Req() req) {
    const email = req.user.email;
    const { value } = req.body;
    return this.blockchainService.walletImport(email, value);
  }

  // @Get('first_reword')
  // async getFirstReword(@Req() req) {
  //   return this.blockchainService.getFirstReword(req.user.email);
  // }

  @Get('get/balance')
  async getBalance(@Req() req) {
    return this.blockchainService.refreshBalance(req.user.email);
  }

  @Get('attendance/check')
  async attendanceCheck(@Req() req) {
    return this.blockchainService.attendanceCheck(req.user.email);
  }
}
