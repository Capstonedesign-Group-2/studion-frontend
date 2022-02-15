import { createSlice } from '@reduxjs/toolkit'

import { RoomsState } from '../../types';
import { getRoomList } from '../actions/room';

const initialState = {
  roomList: [],
  channelList: [],
  users: [],
  isLoading: true,

  getRoomListError: null,
} as RoomsState;

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    addUser(state, action) {
      state.users = state.users.concat(action.payload);
    },
    deleteUser(state, action) {
      state.users = state.users.filter(v => v.id !== action.payload.id)
    },
    setLoading(state, action) {
      state.isLoading = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // 합주실 리스트 불러오기
      .addCase(getRoomList.pending, (state, action) => { // room/getRoomList/pending
        state.getRoomListError = null;
      })
      .addCase(getRoomList.fulfilled, (state, action) => { // room/getRoomList/fulfilled
        state.roomList = action.payload;
        state.getRoomListError = null;
      })
      .addCase(getRoomList.rejected, (state, action) => { // room/getRoomList/rejected
        state.getRoomListError = action.error.message;
      })
  },
});

export default roomSlice;
