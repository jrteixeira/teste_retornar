import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { calculateShipping } from '../../../assets/functions/DeliveryCalculator';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/RootState';
import { editShipping } from '../../../redux/reducers/priceBarReducer';

interface ProductConfirmOrderProps {
  getValues: any
}

const ProductConfirmOrder: React.FC<ProductConfirmOrderProps> = ({getValues}) => {
  const dispatch = useDispatch();
  const quantity = useSelector((state: RootState) => state.priceBar.quantity);
  const price = useSelector((state: RootState) => state.priceBar.price);

  const order = getValues()
  const frete = calculateShipping(order.stepOne.size, order.stepTwo.flavor)
  dispatch(editShipping(frete));
  return (
    <div className="order_confirm_container">
      <p className='title'>Tamanho</p>
      <p className='sub_title'>{order.stepOne.size}</p>
      <p className='title'>Fruta</p>
      <p className='sub_title'>{order.stepTwo.flavor}</p>
      <p className='title'>Acompanhamentos:</p>
      <ul className='sub_title'>
        {order.stepThree.options.length > 0 ?
        order.stepThree.options.map((opt:string, i:number) => <li key={i}>{opt}</li>)
        :<span>Nenhum Acompanhamento</span>
        }
      </ul>
      <p className='title mt-16' style={{lineHeight: 'normal', marginBottom: '4px'}}>Frete: R${frete},00</p>
      <p className='title' style={{lineHeight: 'normal'}}>pedido: R${price},00</p>
    </div>
  );
};

export default ProductConfirmOrder;
