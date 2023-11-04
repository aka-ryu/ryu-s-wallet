import EndPoint from '../../../interface/endPoint';
import {post} from '../../../utils/api';

export const sendEmailVerfyCode = async (body: {email: string}) => {
  const response = await post(EndPoint.SEND_EMAIL_VERIFYCODE, body);
  return response;
};
