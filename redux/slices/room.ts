import { createSlice } from '@reduxjs/toolkit'

import { getRoomList } from '../actions/room';

const initialState = {
  socket: null,
  roomList: [],

  getRoomListError: null,
} as RoomsState;

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setSocket(state, action) {
      state.socket = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder

      // 새로운 룸 생성
      // .addCase(createNewRoom.pending, (state, action) => { // room/createNewRoom/pending
      //   state.createNewRoomError = null;
      // })
      // .addCase(createNewRoom.fulfilled, (state, action) => { // room/createNewRoom/fulfilled
      //   state.iscreateNewRoom = action.payload;
      //   state.isLoggingIn = false;
      //   state.createNewRoomError = null;
      // })
      // .addCase(createNewRoom.rejected, (state, action) => { // room/createNewRoom/rejected
      //   state.data = null;
      //   state.isLoggingIn = false;
      //   state.createNewRoomError = action.error.message;
      // })

      // 룸 리스트 불러오기
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
