import { createAsyncThunk } from '@reduxjs/toolkit'

export interface UserData {
  id: number
  name: string
  email: string
  image?: string | null
}

interface LoginData {
  email: string
  password: string
}

interface SignUpData extends LoginData {
  name: string
}

export const delay = (time: number, value: any) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(value)
  }, time)
})

export const logIn = createAsyncThunk<UserData, LoginData>(
  'user/logIn',
  async (data, thunkAPI) => {
    console.log('Action data', data)
    const result = await delay(1000, data)
    throw new Error('로그인에 실패하였습니다!')
    return result as UserData
  }
)

export const signUp = createAsyncThunk<UserData, SignUpData>(
  'user/signUp',
  async (data, thunkAPI) => {
    console.log('Action data', data)
    const result = await delay(1000, {
      id: 1,
      name: 'dong',
      email: 'lizill@naver.com',
    })
    return result as UserData
  }
)
