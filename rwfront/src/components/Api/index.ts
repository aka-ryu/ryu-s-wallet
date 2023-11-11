import {signIn} from './auth';
import {checkEmailCode, coffeeCode, sendEmailVerfyCode} from './email';
import {signUp} from './user';
import {
  attendanceCheck,
  getBalance,
  getFirstReword,
  getTransactions,
  walletCreate,
  walletDisconnect,
  walletImport,
} from './wallet';

export default {
  sendEmailVerfyCode,
  checkEmailCode,
  signUp,
  signIn,
  walletCreate,
  walletDisconnect,
  walletImport,
  getFirstReword,
  getBalance,
  attendanceCheck,
  getTransactions,
  coffeeCode,
};
