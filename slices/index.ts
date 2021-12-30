import { combineReducers } from "@reduxjs/toolkit";

import userSlice from './user';

export default combineReducers({
  user: userSlice.reducer,
});
