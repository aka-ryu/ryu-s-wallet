import { Module } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { BlockchainController } from './blockchain.controller';
import { EthersModule } from 'nestjs-ethers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserWallet } from 'src/entities/wallet.entity';
import { Transactional } from 'src/utils/transactional';

@Module({
  imports: [
    EthersModule.forRoot(),
    TypeOrmModule.forFeature([User, UserWallet]),
  ],
  controllers: [BlockchainController],
  providers: [BlockchainService, Transactional],
})
export class BlockchainModule {}
