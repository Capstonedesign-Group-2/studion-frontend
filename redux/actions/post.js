import { createAsyncThunk } from '@reduxjs/toolkit'

import http from '../../http'

// export const createNewRoom = createAsyncThunk<Room[], Room>(
//   'room/createNewRoom',
//   async (data, thunkAPI) => {
//     console.log('Create Room Action', data)
//     await http.post('/rooms/create', data)
//     const res = await http.get('/rooms/show')
//     return res.data
//   }
// )

export const getPostList = createAsyncThunk(
  'post/getPostList',
  async (data, thunkAPI) => {
    const res = await http.get('/posts')
    return res.data.posts
  }
)
// 다음 전체 게시글
export const getNextPostList = createAsyncThunk(
  'post/getNextPostList',
  async (data, thunkAPI) => {
    const res = await http.get(data.next_page_url)
    return res.data.posts
  }
)
export const getUserPostList = createAsyncThunk(
  'post/getUserPostList',
  async (data, thunkAPI) => {
    const res = await http.get(`/posts/${data.id}`)
    return res.data.posts
  }
)

export const getCommentList = createAsyncThunk(
  'post/getCommentList',
  async (data, thunkAPI) => {
    const res = await http.get(`/comments/${data.id}`)
    console.log('commentList', res.data.comments);
    return res.data.comments
  }
)
export const getNextCommentList = createAsyncThunk(
  'post/getNextCommentList',
  async (data, thunkAPI) => {
    const res = await http.get(data.next_page_url)
    return res.data.comments
  }
)