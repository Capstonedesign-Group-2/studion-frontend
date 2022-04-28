import { createSlice } from '@reduxjs/toolkit'
import { getPostList } from '../actions/post';
import { getNextPostList } from '../actions/post';
import { getUserPostList } from '../actions/post'
import { getCommentList } from '../actions/post';
import { getNextCommentList } from '../actions/post';
const initialState = {
  postList: [],
  
  getPostListError: null,

  getNextPostListLoading: false,
  getNextPostListError: null,

  getUserPostListError: null,
  postNextUrl: null,

  commentList: [],
  getCommentListError: null,
  getCommentListLoading: false,

  commentNextUrl: null,
  getNextCommentListError: null,
  getNextCommentListLoading: false,

  // newPostLoading: false,
  // newPostDone: false,
  // newPostError: null,
}

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    deleteNextUrl(state, action) {
      state.commentNextUrl = null
    },
  },
  extraReducers: (builder) => {
    builder
      // 게시글 리스트 불러오기
      .addCase(getPostList.pending, (state, action) => { // room/getPostList/pending
        state.getPostListError = null;
      })
      .addCase(getPostList.fulfilled, (state, action) => { // room/getPostList/fulfilled
        state.postNextUrl = action.payload.next_page_url
        state.postList = action.payload.data;
        state.getPostListError = null;
      })
      .addCase(getPostList.rejected, (state, action) => { // room/getPostList/rejected
        state.getPostListError = action.error.message;
      })
      // 다음 게시글 리스트 불러오기
      .addCase(getNextPostList.pending, (state, action) => { // room/getNextPostList/pending
        state.getNextPostListLoading = true;
        state.getNextPostListError = null;
      })
      .addCase(getNextPostList.fulfilled, (state, action) => { // room/getNextPostList/fulfilled
        state.getNextPostListLoading = false;
        state.postNextUrl = action.payload.next_page_url
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

      // 글 commentsList 불러오기
      .addCase(getCommentList.pending, (state, action) => { // room/getCommentList/pending
        state.getCommentListLoading = true;
        state.getCommentListError = null;
      })
      .addCase(getCommentList.fulfilled, (state, action) => { // room/getCommentList/fulfilled
        state.getCommentListLoading = false;
        state.commentNextUrl = action.payload.next_page_url
        state.commentList = action.payload.data;
        state.getCommentListError = null;
      })
      .addCase(getCommentList.rejected, (state, action) => { // room/getCommentList/rejected
        state.getCommentListLoading = false;
        state.getCommentListError = action.error.message;
      })
      // 다음 페이지 commentsList 불러오기
      .addCase(getNextCommentList.pending, (state, action) => { // room/getNextCommentList/pending
        state.getNextCommentListLoading = true;
        state.getNextCommentListError = null;
      })
      .addCase(getNextCommentList.fulfilled, (state, action) => { // room/getNextCommentList/fulfilled
        state.getNextCommentListLoading = false;
        state.commentNextUrl = action.payload.next_page_url
        state.commentList = [...state.commentList, ...action.payload.data];
        state.getNextCommentListError = null;
      })
      .addCase(getNextCommentList.rejected, (state, action) => { // room/getNextCommentList/rejected
        state.getNextCommentListLoading = false;
        state.getNextCommentListError = action.error.message;
      })
  },
});

export default postSlice;
