import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { JwtAuthGuard } from 'src/guards/jwt.authguard';

@UseGuards(JwtAuthGuard)
@Controller('blockchain')
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get('test')
  async test() {
    return this.blockchainService.test();
  }

  @Get('wallet/create')
  async walletCreate(@Req() req) {
    console.log('gdgd');
    return {
      gd: 'gd',
    };
    return this.blockchainService.walletCreate(req.user.email);
  }
}
