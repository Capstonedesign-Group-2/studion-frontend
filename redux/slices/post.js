import { createSlice } from '@reduxjs/toolkit'
import { getPostList } from '../actions/post';
import { getNextPostList } from '../actions/post';
import { getUserPostList } from '../actions/post'

const initialState = {
  postList: [],

  getPostListError: null,

  getNextPostListLoading: false,
  getNextPostListError: null,

  getUserPostListError: null,
  nextUrl: null,
  // newPostLoading: false,
  // newPostDone: false,
  // newPostError: null,
}

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      // 게시글 리스트 불러오기
      .addCase(getPostList.pending, (state, action) => { // room/getPostList/pending
        state.getPostListError = null;
      })
      .addCase(getPostList.fulfilled, (state, action) => { // room/getPostList/fulfilled
        state.nextUrl = action.payload.next_page_url
        state.postList = action.payload.data;
        state.getPostListError = null;
      })
      .addCase(getPostList.rejected, (state, action) => { // room/getPostList/rejected
        state.getPostListError = action.error.message;
      })
      // 다음 개시글 리스트 불러오기
      .addCase(getNextPostList.pending, (state, action) => { // room/getNextPostList/pending
        state.getNextPostListLoading = true;
        state.getNextPostListError = null;
      })
      .addCase(getNextPostList.fulfilled, (state, action) => { // room/getNextPostList/fulfilled
        state.getNextPostListLoading = false;
        state.nextUrl = action.payload.next_page_url
        state.postList = [ ...state.postList, ...action.payload.data];
        state.getNextPostListError = null;
      })
      .addCase(getNextPostList.rejected, (state, action) => { // room/getNextPostList/rejected
        state.getNextPostListLoading = false;
        state.getNextPostListError = action.error.message;
      })
      // 개인 게시글 리스트 불러오기
      .addCase(getUserPostList.pending, (state, action) => { // room/getUserPostList/pending
  
        state.getUserPostListError = null;
      })
      .addCase(getUserPostList.fulfilled, (state, action) => { // room/getUserPostList/fulfilled
        state.postList = action.payload.data;
        state.getUserPostListError = null;
      })
      .addCase(getUserPostList.rejected, (state, action) => { // room/getUserPostList/rejected
        state.getUserPostListError = action.error.message;
      })
      // 다음 개시글 리스트 불러오기
      // .addCase(getNextUserPostList.pending, (state, action) => { // room/getNextUserPostList/pending
      //   state.getNextUserPostListError = null;
      // })
      // .addCase(getNextUserPostList.fulfilled, (state, action) => { // room/getNextUserPostList/fulfilled
      //   state.nextUrl = action.payload.next_page_url
      //   state.postList = [ ...state.postList, ...action.payload.data];
      //   state.getNextUserPostListError = null;
      // })
      // .addCase(getNextUserPostList.rejected, (state, action) => { // room/getNextUserPostList/rejected
      //   state.getNextUserPostListError = action.error.message;
      // })
      // // 게시글 작성
      // .addCase(newPost.pending, (state, action) => { // room/newPost/pending
      //   state.newPostDone = false;
      //   state.newPostLoading = true;
      //   state.newPostError = null;
      // })
      // .addCase(newPost.fulfilled, (state, action) => { // room/newPost/fulfilled
      //   state.newPostDone = true;
      //   state.newPostLoading = false;
      //   state.newPostError = null;
      // })
      // .addCase(newPost.rejected, (state, action) => { // room/newPost/rejected
      //   state.newPostDone = false;
      //   state.newPostLoading = false;
      //   state.newPostError = action.error;
      // })
  },
});

export default postSlice;
