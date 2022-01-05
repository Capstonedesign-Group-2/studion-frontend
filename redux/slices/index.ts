import { combineReducers } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"

import userSlice from './user'

const rootReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    }
  }
  return combineReducers({
    user: userSlice.reducer,
  })(state, action)
}

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
