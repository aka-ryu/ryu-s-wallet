// userSlice.js
import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    token: '',
    is_login: false,
    is_wallet: false,
  },
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.is_login = true;
      state.is_wallet = action.payload.is_wallet;
    },
    logout: state => {
      state.email = '';
      state.token = '';
      state.is_login = false;
      state.is_wallet = false;
    },
    setWallet: (state, action) => {
      state.is_wallet = action.payload.is_wallet;
    },
  },
});

export const {login, logout, setWallet} = userSlice.actions;

export default userSlice.reducer;
