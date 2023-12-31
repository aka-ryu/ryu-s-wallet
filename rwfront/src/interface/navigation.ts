import Routes from '../navigation/Routes';

export type RootStackParamList = {
  [Routes.SIGN_IN]: undefined;
  [Routes.SIGN_UP]: undefined;
  [Routes.FORGOT_PASSWORD]: undefined;
  [Routes.HOME]: undefined;
  [Routes.GET_WALLET]: undefined;
  [Routes.MNEMONIC]: {mnemonic: string};
  [Routes.WALLET_IMPORT]: undefined;
  [Routes.TRANSACTIONS]: undefined;
};
