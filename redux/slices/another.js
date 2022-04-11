import { createSlice } from '@reduxjs/toolkit'
import { getAnotherUserInfo } from "../actions/another";

const initialState = {
    userInfo: Object,
    getAnotherUserInfoError: null,
}

const anotherSlice = createSlice({
  name: 'another',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      // 게시글 리스트 불러오기
      .addCase(getAnotherUserInfo.pending, (state, action) => { // room/getAnotherUserInfo/pending
        state.getAnotherUserInfoError = null;
      })
      .addCase(getAnotherUserInfo.fulfilled, (state, action) => { // room/getAnotherUserInfo/fulfilled
        state.userInfo = action.payload.user;
        state.getAnotherUserInfoError = null;
      })
      .addCase(getAnotherUserInfo.rejected, (state, action) => { // room/getAnotherUserInfo/rejected
        state.getAnotherUserInfoError = action.error.message;
      })
  },
});

export default anotherSlice;
