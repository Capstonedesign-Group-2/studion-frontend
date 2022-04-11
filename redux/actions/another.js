import { createAsyncThunk } from '@reduxjs/toolkit'
import http from '../../http'

export const getAnotherUserInfo = createAsyncThunk(
  'another/getAnotherUserInfo',
  async (data, thunkAPI) => {
    const res = await http.get(`/users/${data.id}`)
    console.log('resData',res.data)
    return res.data
  }
)