import EndPoint from '../../../interface/endPoint';
import {get} from '../../../utils/api';

export const walletCreate = async () => {
  return await get(EndPoint.WALLET_CREATE);
};
