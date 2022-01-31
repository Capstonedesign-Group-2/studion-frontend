import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  masterGainNode: null,
  localGainNode: null,
  channels: [], // users

} as MixerState;

const mixerSlice = createSlice({
  name: 'mixer',
  initialState,
  reducers: {
    setMasterGainNode(state, action) {
      state.masterGainNode = action.payload;
    },
    setLocalGainNode(state, action) {
      state.localGainNode = action.payload;
    }
  },
});

export default mixerSlice;
