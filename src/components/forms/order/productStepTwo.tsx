import React, { useEffect, useState } from 'react';
import fruta1 from '../../../assets/images/banana.png'
import fruta2 from '../../../assets/images/morango.png'
import fruta3 from '../../../assets/images/kiwi.png'

interface ProductStepTwoProps {
  register: any;
  price: number;
  togglePriceBar: (price: number, keepHide: boolean) => void;
  setValue: any;
}

const ProductStepTwo: React.FC<ProductStepTwoProps> = ({ register, togglePriceBar, price, setValue }) => {

  const [lastSelectedFlavor, setLastSelectedFlavor] = useState<number>(0);

  const handleRadioClick = (value: number, e:any, reset: number | null = null) => {
    if(reset){
      togglePriceBar(price - reset, true);
      setValue('stepTwo.price', 0)
      setLastSelectedFlavor(0)
      return localStorage.removeItem('selectedstepTwoValue');
    }
    togglePriceBar(price + value - lastSelectedFlavor, false);
    setValue('stepTwo.price', value)
    setLastSelectedFlavor(value)
    localStorage.setItem('selectedstepTwoValue', JSON.stringify(e?.target.value));
  };
  useEffect(()=>{
    const storedValue = localStorage.getItem('selectedstepTwoValue');
    if(storedValue){
      const optionMappings = {
        'banana': 0,
        'morango': 4,
        'kiwi': 2,
      };
      const selectedOption = storedValue.replace(/^"(.*)"$/, '$1') as keyof typeof optionMappings;
      const difference = optionMappings[selectedOption];
      handleRadioClick(0, null, difference)
    }
  },[])

  return (
    <>
      <div className='d-flex justify-space my-20'>
        <label className='radio_label d-flex align-center'><img className='mr-10' src={fruta1}/> Banana</label>
        <div className="radio_container">
          <span className='radio_label'>+R$0</span>
          <input
            className='radio-custom'
            type="radio"
            value={'banana'}
            onClick={(e) => handleRadioClick(0, e)}
            {...register('stepTwo.flavor')}
          />
        </div>
      </div>
      <div className='d-flex justify-space my-20'>
        <label className='radio_label d-flex align-center'><img className='mr-10' src={fruta2}/> Morango</label>
        <div className="radio_container">
          <span className='radio_label'>+R$4</span>
          <input
            className='radio-custom'
            type="radio"
            value={'morango'}
            onClick={(e) => handleRadioClick(4, e)}
            {...register('stepTwo.flavor')}
          />
        </div>
      </div>
      <div className='d-flex justify-space my-20'>
        <label className='radio_label d-flex align-center'><img className='mr-10' src={fruta3}/> kiwi</label>
        <div className="radio_container">
          <span className='radio_label'>+R$2</span>
          <input
            className='radio-custom'
            type="radio"
            value={'kiwi'}
            onClick={(e) => handleRadioClick(2, e)}
            {...register('stepTwo.flavor')}
          />
        </div>
      </div>
    </>
  );
};

export default ProductStepTwo;
