enum EndPoint {
  SEND_EMAIL_VERIFYCODE = '/email/send/verifycode',
  CHECK_EMAIL_CODE = '/email/check/code',
  SIGN_UP = '/user/signup',
  SIGN_IN = '/auth/signin',
  WALLET_CREATE = '/blockchain/wallet/create',
  WALLET_DISCONNECT = '/blockchain/wallet/disconnect',
  WALLET_IMPORT = '/blockchain/wallet/import',
  FIRST_REWORD = '/blockchain/first_reword',
  GET_BALANCE = '/blockchain/get/balance',
  ATTENDANCE_CHECK = '/blockchain/attendance/check',
  GET_TRANSACTIONS = '/blockchain/get/transactions',
  COFFEE_CODE = '/email/coffee/code',
  CHANGE_PASSWORD = '/user/change/password',
}

export default EndPoint;
