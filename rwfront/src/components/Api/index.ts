import {signIn} from './auth';
import {checkEmailCode, sendEmailVerfyCode} from './email';
import {signUp} from './user';

export default {
  sendEmailVerfyCode,
  checkEmailCode,
  signUp,
  signIn,
};
