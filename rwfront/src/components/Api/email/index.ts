import EndPoint from '../../../interface/endPoint';
import {post} from '../../../utils/api';

export const sendEmailVerfyCode = async (body: {
  email: string;
  type: string;
}) => {
  return await post(EndPoint.SEND_EMAIL_VERIFYCODE, body);
};

export const checkEmailCode = async (body: {
  code: string;
  email: string;
  type: string;
}) => {
  return await post(EndPoint.CHECK_EMAIL_CODE, body);
};
