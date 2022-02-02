import { createSlice } from '@reduxjs/toolkit'
import { RoomsState } from '../../types';

import { getRoomList } from '../actions/room';

const initialState = {
  socket: null,
  roomList: [],
  channelList: [],

  getRoomListError: null,
} as RoomsState;

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setSocket(state, action) {
      state.socket = action.payload;
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
