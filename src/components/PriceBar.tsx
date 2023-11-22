import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/RootState';
import { showPriceBar, disablePriceBar, editQuantity } from '../redux/reducers/priceBarReducer';

interface PriceBarComponentProps {
  updateStepCallback: Function;
  step: number;
}

const PriceBarComponent: React.FC<PriceBarComponentProps> = ({ updateStepCallback, step }) => {
  const dispatch = useDispatch();
  const { show, price, disable } = useSelector((state: RootState) => state.priceBar);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [localquantity, setLocalQuantity] = useState(1);

  useEffect(() => {
    setFinalPrice(localquantity * price);
  }, [localquantity, price]);

  const handlelocalQuantityChange = (delta: number) => {
    const newlocalQuantity = Math.max(1, localquantity + delta);
    dispatch(editQuantity(newlocalQuantity));
    setLocalQuantity(newlocalQuantity);
  };

  const next = () => {
    if(step !==  2)
    dispatch(disablePriceBar(true));
    if(step === 4) 
    dispatch(showPriceBar(false));
    updateStepCallback('inc');
  };

  return (
    <>
      {show && (
        <div className='pricebar_container'>
          <div className="quantity">
            <div className="number-input">
              <button className="minus" onClick={() => handlelocalQuantityChange(-1)}></button>
              <input
                className="quantity"
                min="1"
                readOnly
                name="quantity"
                value={localquantity}
                type="number"
                onChange={(e) => setLocalQuantity(Number(e.target.value))}
              />
              <button className="plus" onClick={() => handlelocalQuantityChange(1)}></button>
            </div>
          </div>
          <div className="next">
            <button disabled={disable} className='styled_button' onClick={next}>
              <span className='label_1'>Avançar</span>
              <span className='label_2'>{`R$${finalPrice}`}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PriceBarComponent;
