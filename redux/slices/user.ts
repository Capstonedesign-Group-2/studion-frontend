import { createSlice } from '@reduxjs/toolkit'

import { logIn, signUp } from '../actions/user'
import { UserData } from '../actions/user';

interface UsersState {
  data: UserData | null

  isLoggingIn: boolean
  loginError?: string | null

  isSigningUP: boolean
  signupError?: string | null
}

const initialState = {
  // isLogin: window.localStorage.getItem("isLogin"),
  data: null,

  isLoggingIn: false,
  loginError: null,

  isSigningUP: false,
  signupError: null,
} as UsersState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { // 동기적, 내부적
    logOut(state) {
      state.data = null;
    }
  },
  extraReducers: (builder) => {
    builder

    // 로그인
    .addCase(logIn.pending, (state, action) => { // user/logIn/pending
      state.isLoggingIn = true;
      state.loginError = null;
    })
    .addCase(logIn.fulfilled, (state, action) => { // user/logIn/fulfilled
      state.data = action.payload; // 유저 데이터 저장
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
      state.data = action.payload; // 유저 데이터 저장
      state.isSigningUP = false;
      state.signupError = null;
    })
    .addCase(signUp.rejected, (state, action) => { // user/signUp/rejected
      state.data = null;
      state.isSigningUP = false;
      state.signupError = action.error.message;
    })
  },
});

export default userSlice;
