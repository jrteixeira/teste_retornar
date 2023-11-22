// redux/reducers/priceBarReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PriceBarState {
  show: boolean;
  disable: boolean;
  price: number;
  quantity: number;
  shipping: number;
}

const initialState: PriceBarState = {
  show: false,
  disable: false,
  price: 0,
  quantity: 1,
  shipping: 0
};

const priceBarReducer = createSlice({
  name: 'priceBar',
  initialState,
  reducers: {
    showPriceBar: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    },
    editPrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },
    editQuantity: (state, action: PayloadAction<number>) => {
      state.quantity = action.payload;
    },
    disablePriceBar: (state, action: PayloadAction<boolean>) => {
      state.disable = action.payload;
    },
    editShipping: (state, action: PayloadAction<number>) => {
      state.shipping = action.payload;
    },
  },
});

export const { showPriceBar, editPrice, editQuantity, disablePriceBar, editShipping } = priceBarReducer.actions;
export default priceBarReducer.reducer;
