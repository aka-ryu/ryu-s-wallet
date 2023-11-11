import { Injectable } from '@nestjs/common';
import { InjectSignerProvider, EthersSigner } from 'nestjs-ethers';
import { Wallet } from 'ethers';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Between, Repository } from 'typeorm';
import { ResponseDTO } from 'src/dto/response.dto';
import { UserWallet } from 'src/entities/wallet.entity';
import { Transactional } from 'src/utils/transactional';
import { ethers } from 'ethers';
import ERC20_ABI from './../../interface/abi.json';
import { Attendance } from 'src/entities/attendance.entity';
import { startOfDay, endOfDay } from 'date-fns';
import { Alchemy, Network, Utils, Wallet as AWallet } from 'alchemy-sdk';
import { Transaction } from 'src/entities/transaction.entity';

@Injectable()
export class BlockchainService {
  private provider: ethers.providers.JsonRpcProvider;
  private contract: ethers.Contract;
  constructor(
    @InjectSignerProvider()
    private readonly ethersSigner: EthersSigner,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(UserWallet)
    private walletRepo: Repository<UserWallet>,
    @InjectRepository(Attendance)
    private attendanceRepo: Repository<Attendance>,
    @InjectRepository(Transaction)
    private trasactionRepo: Repository<Transaction>,
    private transactional: Transactional,
  ) {
    this.provider = new ethers.providers.JsonRpcProvider(
      'https://sepolia.drpc.org',
    );
    this.contract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS,
      ERC20_ABI,
      this.provider,
    );
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
      responseDTO.message = '오류가 발생하였습니다.';
      return responseDTO;
    }

    const walletGenerate = this.ethersSigner.createRandomWallet();

    try {
      await this.transactional.run(async (manager) => {
        const wallet = new UserWallet();
        wallet.address = walletGenerate.address;
        wallet.privateKey = walletGenerate.privateKey;
        wallet.balance = '0';
        wallet.user_id = user.id;
        wallet.user = user;

        await manager.save(wallet);

        user.is_wallet = 1;

        await manager.save(user);

        responseDTO.message = '지갑이 생성되었습니다.';
        responseDTO.result = 'success';
        responseDTO.data = {
          mnemonic: walletGenerate.mnemonic,
          address: walletGenerate.address,
        };
      });
    } catch (error) {
      responseDTO.message = '오류가 발생하였습니다.';
      responseDTO.result = 'false';
    } finally {
      return responseDTO;
    }
  }

  async walletDisconnect(email: string) {
    const responseDTO = new ResponseDTO();
    const user = await this.userRepo.findOne({
      where: {
        email: email,
        is_wallet: 1,
      },
      relations: ['wallet'],
    });

    if (!user || !user.wallet) {
      responseDTO.result = 'false';
      responseDTO.message = '오류가 발생하였습니다.';
      return responseDTO;
    }

    try {
      await this.transactional.run(async (manager) => {
        await manager.update(User, user.id, {
          wallet: null,
          is_wallet: 0,
        });

        await manager.delete(UserWallet, user.wallet.id);

        responseDTO.message = '지갑연결이 해제되었습니다.';
        responseDTO.result = 'success';
      });
    } catch (error) {
      responseDTO.message = '오류가 발생하였습니다.';
      responseDTO.result = 'false';
    } finally {
      return responseDTO;
    }
  }

  async walletImport(email: string, value: string) {
    const responseDTO = new ResponseDTO();
    const user = await this.userRepo.findOne({
      where: {
        email: email,
        is_wallet: 0,
      },
    });

    if (!user) {
      responseDTO.result = 'false';
      responseDTO.message = '오류가 발생하였습니다.';
      return responseDTO;
    }

    let importWallet;

    try {
      importWallet = Wallet.fromMnemonic(value);
    } catch (error) {
      responseDTO.message = '정보가 유효하지 않습니다.';
      responseDTO.result = 'false';
      return responseDTO;
    }

    try {
      await this.transactional.run(async (manager) => {
        const wallet = new UserWallet();
        wallet.address = importWallet.address;
        wallet.privateKey = importWallet.privateKey;
        wallet.balance = '0';
        wallet.user_id = user.id;
        wallet.user = user;

        await manager.save(wallet);

        user.is_wallet = 1;

        await manager.save(user);

        responseDTO.message = '지갑을 가져오는데 성공하였습니다.';
        responseDTO.result = 'success';
        responseDTO.data = {
          walletAddress: wallet.address,
        };
      });
    } catch (error) {
      responseDTO.message = '오류가 발생하였습니다.';
      responseDTO.result = 'false';
    } finally {
      return responseDTO;
    }
  }

  // async getFirstReword(email: string) {
  //   //로직작성
  //   const responseDTO = new ResponseDTO();

  //   responseDTO.message = '첫 보상이 지급되었습니다.';
  //   responseDTO.result = 'success';
  //   return responseDTO;
  // }

  async refreshBalance(email: string) {
    const responseDTO = new ResponseDTO();
    const user = await this.userRepo.findOne({
      where: {
        email: email,
        is_wallet: 1,
      },
      relations: ['wallet'],
    });

    try {
      const balance = await this.contract.balanceOf(user.wallet.address);
      const formattedBalance = ethers.utils.formatUnits(balance, 18);

      user.wallet.balance = formattedBalance;
      await this.walletRepo.save(user.wallet);

      responseDTO.data = {
        balance: formattedBalance,
      };
      responseDTO.message = '잔액이 갱신되었습니다.';
      responseDTO.result = 'success';
    } catch (error) {
      responseDTO.message = '오류가 발생하였습니다.';
      responseDTO.result = 'false';
    }

    return responseDTO;
  }

  async attendanceCheck(email: string) {
    const responseDTO = new ResponseDTO();

    const user = await this.userRepo.findOne({
      where: {
        email: email,
        is_wallet: 1,
      },
      relations: ['wallet'],
    });
    const today = new Date();
    const attendance = await this.attendanceRepo.findOne({
      where: {
        user_id: user.id,
        date: Between(startOfDay(today), endOfDay(today)),
      },
    });

    if (attendance) {
      responseDTO.message = '이미 출석체크를 하였습니다.';
      responseDTO.result = 'false';
      return responseDTO;
    }

    try {
      const tx = await this.sendToken(user.wallet.address);

      await this.transactional.run(async (manager) => {
        const transaction = new Transaction();
        transaction.user_id = user.id;
        transaction.tx_id = tx.hash;
        transaction.send_type = '출석 보상';

        const newAttedence = new Attendance();

        newAttedence.user_id = user.id;
        newAttedence.date = today;

        await manager.save(newAttedence);
        await manager.save(transaction);
      });

      responseDTO.message = '보상 트랜잭션이 전송되었습니다.';
      responseDTO.result = 'success';
    } catch (error) {
      responseDTO.message = '오류가 발생하였습니다.';
      responseDTO.result = 'false';
    }

    return responseDTO;
  }

  async sendToken(to: string) {
    const settings = {
      apiKey: process.env.ALCHEMY_KEY, // Replace with your API key.
      network: Network.ETH_SEPOLIA, // Replace with your network.
    };

    const alchemy = new Alchemy(settings);

    const sender = new AWallet(process.env.ADMIN_PRIVATEKEY, alchemy);

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

  async getTransactions(email: string) {
    const user = await this.userRepo.findOne({
      where: {
        email: email,
      },
    });

    const txList = await this.trasactionRepo.find({
      where: {
        user_id: user.id,
      },
      order: { created_at: 'DESC' },
    });

    const responseDTO = new ResponseDTO();
    responseDTO.result = 'success';
    responseDTO.message = '트랜잭션 리스트입니다.';
    responseDTO.data = {
      txList: txList,
    };
    return responseDTO;
  }
}
