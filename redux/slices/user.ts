import { createSlice } from '@reduxjs/toolkit'
import cookie from 'react-cookies';

import { getUser, logIn, logOut, signUp } from '../actions/user'
import { UserData } from '../actions/user';

interface UsersState {
  isLogin: string | null
  data: UserData | null

  isLoggingIn: boolean
  loginError?: string | null

  isSigningUP: boolean
  signupError?: string | null

  getUserError?: string | null

  logOutError?: string | null

  refreshError?: string | null
}

const initialState = {
  isLogin: null,
  data: null,

  isLoggingIn: false,
  loginError: null,

  isSigningUP: false,
  signupError: null,

  getUserError: null,

  logOutError: null,

  refreshError: null,
} as UsersState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder

    // 로그인
    .addCase(logIn.pending, (state, action) => { // user/logIn/pending
      state.isLoggingIn = true;
      state.loginError = null;
    })
    .addCase(logIn.fulfilled, (state, action) => { // user/logIn/fulfilled
      state.isLogin = action.payload;
      state.isLoggingIn = false;
      state.loginError = null;
    })
    .addCase(logIn.rejected, (state, action) => { // user/logIn/rejected
      state.data = null;
      state.isLoggingIn = false;
      state.loginError = action.error.message;
    })

    // 회원가입
    .addCase(signUp.pending, (state, action) => { // user/signUp/pending
      state.isSigningUP = true;
      state.signupError = null;
    })
    .addCase(signUp.fulfilled, (state, action) => { // user/signUp/fulfilled
      state.isLogin = action.payload;
      state.isSigningUP = false;
      state.signupError = null;
    })
    .addCase(signUp.rejected, (state, action) => { // user/signUp/rejected
      state.data = null;
      state.isSigningUP = false;
      state.signupError = action.error.message;
    })

    // 유저정보
    .addCase(getUser.pending, (state, action) => { // user/getUser/pending
      state.getUserError = null;
    })
    .addCase(getUser.fulfilled, (state, action) => { // user/getUser/fulfilled
      state.data = action.payload; // 유저 데이터 저장
      state.getUserError = null;
    })
    .addCase(getUser.rejected, (state, action) => { // user/getUser/rejected
      state.data = null;
      state.getUserError = action.error.message;
    })

    // 로그아웃
    .addCase(logOut.pending, (state, action) => { // user/logOut/pending
      state.logOutError = null;
    })
    .addCase(logOut.fulfilled, (state, action) => { // user/logOut/fulfilled
      state.isLogin = null;
      state.data = null; // 유저 데이터 삭제
      state.logOutError = null;
    })
    .addCase(logOut.rejected, (state, action) => { // user/logOut/rejected
      state.data = null;
      state.logOutError = action.error.message;
    })
  },
});

export default userSlice;
