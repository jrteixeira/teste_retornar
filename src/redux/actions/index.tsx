// actions/index.ts
import { createAction } from '@reduxjs/toolkit';

export const showPriceBar = createAction<boolean>('SHOW_PRICE_BAR');

export const disablePriceBar = createAction<boolean>('DISABLE_PRICE_BAR');

export const editPrice = createAction<number>('EDIT_PRICE');

export const editQuantity = createAction<number>('EDIT_QUANTITY');

export const editShipping = createAction<number>('EDIT_SHIPPING');

