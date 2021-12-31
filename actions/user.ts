import { createAsyncThunk } from '@reduxjs/toolkit';

interface JoinData {
  name: string
  email: string
  password: string
}

export const delay = (time: number, value: any) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(value);
  }, time);
});

export const logIn = createAsyncThunk(
  'user/logIn',
  async (data: JoinData, thunkAPI) => {
    console.log(data);
    const result = await delay(500, data);
    return result;
  }
);
