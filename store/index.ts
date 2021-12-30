import { configureStore } from '@reduxjs/toolkit';

import reducer from '../slices';

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
});

module.exports = store;
