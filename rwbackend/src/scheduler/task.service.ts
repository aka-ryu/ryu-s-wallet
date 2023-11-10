import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'src/entities/transaction.entity';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
    private httpService: HttpService,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleCron() {
    const txList = await this.transactionRepo.find({
      where: {
        result: 0,
      },
    });

    if (txList.length === 0) {
      return;
    }

    for (let i = 0; i < txList.length; i++) {
      console.log(i);
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
}
