// userSlice.js
import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    token: '',
    isLoggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logout: state => {
      state.email = '';
      state.token = '';
      state.isLoggedIn = false;
    },
  },
});

export const {login, logout} = userSlice.actions;

export default userSlice.reducer;
