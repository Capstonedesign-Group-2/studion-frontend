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
    const res = await http.get('/posts/show')
    return res.data.posts
  }
)


