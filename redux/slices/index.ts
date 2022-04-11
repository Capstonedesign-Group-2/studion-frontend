import { combineReducers } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"

import roomSlice from "./room"
import userSlice from './user'
import postSlice from './post'
import anotherSlice from './another'

const rootReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    }
  }
  return combineReducers({
    user: userSlice.reducer,
    room: roomSlice.reducer,
    post: postSlice.reducer,
    another: anotherSlice.reducer,
  })(state, action)
}

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
