import { Injectable } from '@nestjs/common';
import { InjectSignerProvider, EthersSigner } from 'nestjs-ethers';
import { Wallet } from 'ethers';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ResponseDTO } from 'src/dto/response.dto';

@Injectable()
export class BlockchainService {
  constructor(
    @InjectSignerProvider()
    private readonly ethersSigner: EthersSigner,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}
  async test() {
    const wallet = this.ethersSigner.createRandomWallet();
    const a = {
      address: wallet.address,
      private: wallet.privateKey,
      nm: wallet.mnemonic,
    };

    const pwallet = new Wallet(a.private);

    const b = {
      address: pwallet.address,
      private: pwallet.privateKey,
      nm: pwallet.mnemonic,
    };

    const nwallet = Wallet.fromMnemonic(a.nm.phrase);

    const c = {
      address: nwallet.address,
      private: nwallet.privateKey,
      nm: nwallet.mnemonic,
    };

    const r = [a, b, c];
    return r;
  }

  async walletCreate(email: string) {
    const responseDTO = new ResponseDTO();
    const user = await this.userRepo.findOne({
      where: {
        email: email,
        is_wallet: 0,
      },
    });

    if (!user) {
      responseDTO.result = 'false';
      responseDTO.message = '유저가 없거나, 이미 지갑이 존재합니다.';
      return responseDTO;
    }
  }
}
