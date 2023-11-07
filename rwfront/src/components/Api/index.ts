import {signIn} from './auth';
import {checkEmailCode, sendEmailVerfyCode} from './email';
import {signUp} from './user';
import {walletCreate} from './wallet';

export default {
  sendEmailVerfyCode,
  checkEmailCode,
  signUp,
  signIn,
  walletCreate,
};
