import { createAsyncThunk } from '@reduxjs/toolkit'
import cookie from 'react-cookies'

import http from '../../http'

export const delay = (time: number, value: any) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(value)
  }, time)
})

export const logIn = createAsyncThunk<string, LoginData>(
  'user/logIn',
  async (data, thunkAPI) => {
    console.log('Action data', data)
    const response = await http.post('/users/login', data)
    const accessToken = response.data.access_token
    cookie.save('accessToken', accessToken, {
      path: '/',
    })
    return accessToken as string
  }
)

export const logOut = createAsyncThunk(
  'user/logOut',
  async (data, thunkAPI) => {
    await http.get('/users/logout')
    cookie.remove('accessToken')
  }
)

export const signUp = createAsyncThunk<string, SignUpData>(
  'user/signUp',
  async (data, thunkAPI) => {
    console.log('Action data', data)
    const response = await http.post('/users/register', data)
    const accessToken = response.data.access_token
    cookie.save('accessToken', accessToken, {
      path: '/',
    })
    return accessToken as string
  }
)

export const getUser = createAsyncThunk<User, { accessToken?: string }>(
  'user/getInfo',
  async (data, thunkAPI) => {
    if (data.accessToken) { // SSR
      http.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`
    }
    const res = await http.get('/users/user')
    if (res) {
      return res.data
    } else {
      throw new Error('401')
    }
  }
)

export const refresh = createAsyncThunk<string>(
  'user/getInfo',
  async (data, thunkAPI) => {
    const res = await http.get('/users/refresh')
    return res.data.access_token
  }
)
