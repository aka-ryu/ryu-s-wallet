import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'src/entities/transaction.entity';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { UserWallet } from 'src/entities/wallet.entity';
import { Alchemy, Network, Utils, Wallet } from 'alchemy-sdk';
import { Transactional } from 'src/utils/transactional';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
    @InjectRepository(UserWallet)
    private walletRepo: Repository<UserWallet>,
    private httpService: HttpService,
    private transactional: Transactional,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleCheckTranscion() {
    const txList = await this.transactionRepo.find({
      where: {
        result: 0,
      },
    });

    if (txList.length === 0) {
      return;
    }

    for (let i = 0; i < txList.length; i++) {
      const result = await this.getTransactionReceiptStatus(txList[i].tx_id);
      if (result === '1') {
        txList[i].result = 1;
      } else if (result === '0') {
        txList[i].result = 2;
      }
    }

    await this.transactionRepo.save(txList);
  }

  private async getTransactionReceiptStatus(txhash: string) {
    const url = 'https://api-sepolia.etherscan.io/api';
    const params = {
      module: 'transaction',
      action: 'gettxreceiptstatus',
      txhash: txhash,
      apikey: process.env.ETHERSCAN_KEY,
    };

    const response = await firstValueFrom(
      this.httpService.get(url, { params }),
    );
    return response.data.result.status;
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async retryFailTx() {
    const txList = await this.transactionRepo.find({
      where: {
        result: 2,
        retry: 0,
      },
    });

    if (txList.length === 0) {
      return;
    }

    txList.map(async (tx) => {
      const wallet = await this.walletRepo.findOne({
        where: {
          user_id: tx.user_id,
        },
      });

      const newTx = await this.sendToken(wallet.address);

      await this.transactional.run(async (manager) => {
        const transaction = new Transaction();
        transaction.user_id = wallet.user_id;
        transaction.tx_id = newTx.hash;
        transaction.send_type = '실패 재전송';

        tx.retry = 1;

        await manager.save(transaction);
        await manager.save(tx);
      });
    });
  }

  private async sendToken(to: string) {
    const settings = {
      apiKey: process.env.ALCHEMY_KEY, // Replace with your API key.
      network: Network.ETH_SEPOLIA, // Replace with your network.
    };

    const alchemy = new Alchemy(settings);

    const sender = new Wallet(process.env.ADMIN_PRIVATEKEY, alchemy);

    const toAddress = to;

    const usdcContractAddress = process.env.CONTRACT_ADDRESS;

    const feeData = await alchemy.core.getFeeData();

    const abi = ['function transfer(address to, uint256 value)'];

    const amountToSend = 10;

    const decimals = 18;

    const amountToSendInDecimals = amountToSend * 10 ** decimals;

    const iface = new Utils.Interface(abi);
    const data = iface.encodeFunctionData('transfer', [
      toAddress,
      Utils.parseUnits(amountToSendInDecimals.toString(), 'wei'),
    ]);

    const transaction = {
      to: usdcContractAddress,
      nonce: await alchemy.core.getTransactionCount(sender.getAddress()),
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
      maxFeePerGas: feeData.maxFeePerGas,
      type: 2,
      chainId: 11155111,
      data: data,
      gasLimit: Utils.parseUnits('250000', 'wei'),
    };

    const sendTx = await sender.sendTransaction(transaction);

    return sendTx;
  }
}
