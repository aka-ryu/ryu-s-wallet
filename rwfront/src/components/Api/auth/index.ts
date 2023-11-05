import EndPoint from '../../../interface/endPoint';
import {post} from '../../../utils/api';

export const signIn = async (body: {email: string; password: string}) => {
  return await post(EndPoint.SIGN_IN, body);
};
