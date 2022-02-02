import { createSlice } from '@reduxjs/toolkit'
import { MixerState } from '../../types';

const initialState = {
  masterGain: 1,
  localGain: 1,
  channels: [],
} as MixerState;

const mixerSlice = createSlice({
  name: 'mixer',
  initialState,
  reducers: {
    setMasterGain(state, action) {
      state.masterGain = action.payload;
    },
    setLocalGain(state, action) {
      state.localGain = action.payload;
    },
    setChannels(state, action) {
      state.channels = state.channels.concat(action.payload)
    }
  },
});

export default mixerSlice;
