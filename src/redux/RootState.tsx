// redux/RootState.ts
import  priceBarReducer  from './reducers/priceBarReducer';

export interface RootState {
  priceBar: ReturnType<typeof priceBarReducer>;
}
