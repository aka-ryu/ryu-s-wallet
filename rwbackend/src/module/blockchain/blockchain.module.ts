import { Module } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { BlockchainController } from './blockchain.controller';
import { EthersModule } from 'nestjs-ethers';

@Module({
  imports: [EthersModule.forRoot()],
  controllers: [BlockchainController],
  providers: [BlockchainService],
})
export class BlockchainModule {}
