import React from 'react';

interface ProductStepOneProps {
  register: any;
  togglePriceBar: (price: number) => void;
  setValue: any;
}
const ProductStepOne: React.FC<ProductStepOneProps> = ({ register, togglePriceBar, setValue }) => {
  const handleSizeChange = (price: number) => {
    setValue('stepOne.price', price)
    togglePriceBar(price);
  };

  return (
    <>
      <div className='d-flex justify-space my-20'>
        <label className='radio_label'>Pequeno - 300ml</label>
        <div className="radio_container">
          <span className='radio_label'>R$18</span>
          <input
            className='radio-custom'
            type="radio"
            value={'pequeno'}
            onClick={() => handleSizeChange(18)}
            {...register('stepOne.size')}
          />
        </div>
      </div>
      <div className='d-flex justify-space my-20'>
        <label className='radio_label'>Médio - 500ml</label>
        <div className="radio_container">
          <span className='radio_label'>R$20</span>
          <input
            className='radio-custom'
            type="radio"
            value={'medio'}
            onClick={() => handleSizeChange(20)}
            {...register('stepOne.size')}
          />
        </div>
      </div>
      <div className='d-flex justify-space my-20'>
        <label className='radio_label'>Grande - 700ml</label>
        <div className="radio_container">
          <span className='radio_label'>R$22</span>
          <input
            className='radio-custom'
            type="radio"
            value={'grande'}
            onClick={() => handleSizeChange(22)}
            {...register('stepOne.size')}
          />
        </div>
      </div>
    </>
  );
};

export default ProductStepOne;
