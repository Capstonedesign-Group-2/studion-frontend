import { createAsyncThunk } from '@reduxjs/toolkit'
import http from '../../http'
import Socket from '../../socket'
export const getAnotherUserInfo = createAsyncThunk(
  'another/getAnotherUserInfo',
  async (data, thunkAPI) => {
    const res = await http.get(`/users/${data.id}`)
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
