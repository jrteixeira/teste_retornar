// redux/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import priceBarReducer from '../reducers/priceBarReducer';

const store = configureStore({
  reducer: {
    priceBar: priceBarReducer,
  },
});

export default store;