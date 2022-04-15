import { createAsyncThunk } from '@reduxjs/toolkit'
import http from '../../http'

export const getAnotherUserInfo = createAsyncThunk(
  'another/getAnotherUserInfo',
  async (data, thunkAPI) => {
    const res = await http.get(`/users/${data.id}`)
    console.log('getAnotherUserInfo', res.data);
    return res.data
  }
)
export const getFollowData = createAsyncThunk(
  'another/getFollowData',
  async (data, thunkAPI) => {
    const res = await http.post(`/follows/${data.userInfo}`,{ user_id: data.userData })
    console.log('getFollowData', res)
    return res.data
  }
)
// export const getFollowUsersData = createAsyncThunk(
//   'another/getFollowUsersData',
//   async (data, thunkAPI) => {
//     const res = await http.get(`/follows/${data.userId}/${data.kind}`)
//     return res.data
//   }
// )
// export const getNextFollowUsersData = createAsyncThunk(
//   'another/getNextFollowUsersData',
//   async (data, thunkAPI) => {
//     const res = await http.get(data.next_page_url)
//     console.log('getNextFollowUsersData', res)
//     return res.data
//   }
// )