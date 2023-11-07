import { Module } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { BlockchainController } from './blockchain.controller';
import { EthersModule } from 'nestjs-ethers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [EthersModule.forRoot(), TypeOrmModule.forFeature([User])],
  controllers: [BlockchainController],
  providers: [BlockchainService],
})
export class BlockchainModule {}
