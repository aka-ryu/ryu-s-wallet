import EndPoint from '../../../interface/endPoint';
import {get, post} from '../../../utils/api';

export const walletCreate = async () => {
  return await get(EndPoint.WALLET_CREATE);
};

export const walletDisconnect = async () => {
  return await get(EndPoint.WALLET_DISCONNECT);
};

export const walletImport = async (body: {value: string}) => {
  return await post(EndPoint.WALLET_IMPORT, body);
};

export const getFirstReword = async () => {
  return await get(EndPoint.FIRST_REWORD);
};

export const getBalance = async () => {
  return await get(EndPoint.GET_BALANCE);
};

export const attendanceCheck = async () => {
  return await get(EndPoint.ATTENDANCE_CHECK);
};

export const getTransactions = async () => {
  return await get(EndPoint.GET_TRANSACTIONS);
};
