import { createSlice } from '@reduxjs/toolkit';

import { logIn } from '../actions/user';

interface UsersState {
  isLoggingIn: boolean
  data?: {
    id: number
    name: string
    email: string
    image?: string | null
  } | null | unknown
}

const initialState = {
  isLoggingIn: false,
  data: null,
} as UsersState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { // 동기적, 내부적
    logOut(state, action) {
      state.data = null;
    }
  },
  extraReducers: (builder) => {
    builder

    // 로그인
    .addCase(logIn.pending, (state, action) => { // user/logIn/pending
      state.isLoggingIn = true;
    })
    .addCase(logIn.fulfilled, (state, action) => { // user/logIn/fulfilled
      state.data = action.payload;
      state.isLoggingIn = false;
    })
    .addCase(logIn.rejected, (state, aciton) => { // user/logIn/rejected
      state.data = null;
      state.isLoggingIn = false;
    })
  },
});

export default userSlice;
