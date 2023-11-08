enum EndPoint {
  SEND_EMAIL_VERIFYCODE = '/email/send/verifycode',
  CHECK_EMAIL_CODE = '/email/check/code',
  SIGN_UP = '/user/signup',
  SIGN_IN = '/auth/signin',
  WALLET_CREATE = '/blockchain/wallet/create',
  WALLET_DISCONNECT = '/blockchain/wallet/disconnect',
  WALLET_IMPORT = '/blockchain/wallet/import',
}

export default EndPoint;
