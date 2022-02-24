import { createSlice } from '@reduxjs/toolkit'

import { RoomsState } from '../../types';

const initialState = {
  roomList: [],
  channelList: [],
  users: [],
  isLoading: true,
  roomData: null,
  chatList: [],
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
    setRoomData(state, action) {
      state.roomData = action.payload
    },
    setRoomList(state, action) {
      state.roomList = action.payload
    }
  },
});

export default roomSlice;
