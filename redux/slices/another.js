import { createSlice } from '@reduxjs/toolkit'
import { getAnotherUserInfo, getFollowData, getFollowUsersData, getNextFollowUsersData } from "../actions/another";

const initialState = {
    userInfo: null,

    getAnotherUserInfoError: null,

    following: null,
    getFollowDataError: null,

    getFollowUsersData: null,
    nextUrl: null,
    getNextFollowUsersDataLoading: false,
    getFollowUsersDataError: null,
    getNextFollowUsersDataError: null,
}

const anotherSlice = createSlice({
  name: 'another',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      // 현재 페이지 유저 정보 불러오기
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
      // 유저 팔로우 유무 확인
      .addCase(getFollowData.pending, (state, action) => { // room/getFollowData/pending
        state.getFollowDataError = null;
      })
      .addCase(getFollowData.fulfilled, (state, action) => { // room/getFollowData/fulfilled
        state.following = action.payload;
        state.getFollowDataError = null;
      })
      .addCase(getFollowData.rejected, (state, action) => { // room/getFollowData/rejected
        state.getFollowDataError = action.error.message;
      })
      // 팔로우 하고 있는 유저들 정보
      .addCase(getFollowUsersData.pending, (state, action) => { // room/getFollowUsersData/pending
        state.getFollowUsersDataError = null;
      })
      .addCase(getFollowUsersData.fulfilled, (state, action) => { // room/getFollowUsersData/fulfilled
        state.getFollowUsersData = action.payload;
        state.nextUrl = action.payload.follows.next_page_url
        state.getFollowUsersDataError = null;
      })
      .addCase(getFollowUsersData.rejected, (state, action) => { // room/getFollowUsersData/rejected
        state.getFollowUsersDataError = action.error.message;
      })
      // 팔로우 하고 있는 유저들 정보
      .addCase(getNextFollowUsersData.pending, (state, action) => { // room/getNextFollowUsersData/pending
        state.getNextFollowUsersDataLoading = true;
        state.getNextFollowUsersDataError = null;
      })
      .addCase(getNextFollowUsersData.fulfilled, (state, action) => { // room/getNextFollowUsersData/fulfilled
        state.getNextFollowUsersDataLoading = false;
        state.getNextFollowUsersData = action.payload;
        state.nextUrl = action.payload.follows.next_page_url
        state.getNextFollowUsersDataError = null;
      })
      .addCase(getNextFollowUsersData.rejected, (state, action) => { // room/getNextFollowUsersData/rejected
        state.getNextFollowUsersDataLoading = false;
        state.getNextFollowUsersDataError = action.error.message;
      })
  },
});

export default anotherSlice;
