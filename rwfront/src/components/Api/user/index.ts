import EndPoint from '../../../interface/endPoint';
import {post} from '../../../utils/api';

export const signUp = async (body: {email: string; password: string}) => {
  return await post(EndPoint.SIGN_UP, body);
};

export const changePassword = async (body: {
  email: string;
  password: string;
}) => {
  return await post(EndPoint.CHANGE_PASSWORD, body);
};
