// userSlice.js
import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    token: '',
    is_login: false,
    is_wallet: false,
    is_first_reword: false,
    address: '',
    balance: 0,
  },
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.is_login = true;
      state.is_wallet = action.payload.is_wallet;
      state.is_first_reword = action.payload.is_first_reword;
      state.address = action.payload.address;
      state.balance = action.payload.balance;
    },
    logout: state => {
      state.email = '';
      state.token = '';
      state.is_login = false;
      state.is_wallet = false;
      state.is_first_reword = false;
      state.address = '';
      state.balance = 0;
    },
    setWallet: (state, action) => {
      state.is_wallet = action.payload.is_wallet;
      state.address = action.payload.address;
      state.balance = action.payload.balance;
    },
    setFirstReword: (state, action) => {
      state.is_first_reword = action.payload.is_first_reword;
    },
    getBalance: (state, action) => {
      state.balance = action.payload.balance;
    },
  },
});

export const {login, logout, setWallet, setFirstReword, getBalance} =
  userSlice.actions;

export default userSlice.reducer;
