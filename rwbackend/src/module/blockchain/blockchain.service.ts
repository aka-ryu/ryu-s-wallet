import { Injectable } from '@nestjs/common';
import { InjectSignerProvider, EthersSigner } from 'nestjs-ethers';
import { Wallet } from 'ethers';

@Injectable()
export class BlockchainService {
  constructor(
    @InjectSignerProvider()
    private readonly ethersSigner: EthersSigner,
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
}
