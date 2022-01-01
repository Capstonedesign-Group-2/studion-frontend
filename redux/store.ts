import { configureStore } from '@reduxjs/toolkit'
import { createWrapper, Context } from 'next-redux-wrapper'

import reducer from './slices'

const makeStore = (context: Context) => configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
});

const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== 'production'
})

export default wrapper
