import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import cookie from 'react-cookies'

import http from '../../http'
import { LoginData, SignUpData, IUser } from '../../types'
import ChatSocket from '../../socket/chat'

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
    const { access_token } = response.data
    cookie.save('accessToken', access_token, {
      path: '/',
    })
    return access_token as string
  }
)

export const logOut = createAsyncThunk(
  'user/logOut',
  async (data, thunkAPI) => {
    await http.get('/users/logout')
    cookie.remove('accessToken')
    ChatSocket.socket.removeAllListeners()
  }
)

export const signUp = createAsyncThunk<string, SignUpData>(
  'user/signUp',
  async (data, thunkAPI) => {
    console.log('Action data', data)
    const response = await http.post('/users/register', data)
    const { access_token } = response.data
    cookie.save('accessToken', access_token, {
      path: '/',
    })
    return access_token as string
  }
)

export const getUser = createAsyncThunk<IUser, { accessToken?: string }>(
  'user/getInfo',
  async (data, thunkAPI) => {
    if (data.accessToken) { // SSR
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`
      axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACK_URL || 'http://localhost:8000/api'
      const res = await axios.get('/users/user')
      if (res) {
        return res.data
      } else {
        throw new Error('401')
      }
    } else {
      const res = await http.get('/users/user')
      return res.data
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
