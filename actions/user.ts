import { createAsyncThunk } from '@reduxjs/toolkit';

const delay = (time: number, value: any) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(value);
  }, time);
});

export const logIn = createAsyncThunk(
  'user/logIn',
  async (data, thunkAPI) => {
    console.log(data);
    const result = await delay(500, {
      userId: 1,
      nickname: 'dong',
    });
    return result;
  }
);
