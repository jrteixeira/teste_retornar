import React, { useEffect, useState } from 'react';
import fruta1 from '../../../assets/images/granola.png'
import fruta2 from '../../../assets/images/pacoca.png'
import fruta3 from '../../../assets/images/leite_ninho.png'

interface ProductStepThreeProps {
  register: any;
  price: number;
  togglePriceBar: (price: number, keepHide: boolean) => void;
  setValue: any;
}
const optionPrices: Record<string, number> = {
  'Granola': 3,
  'Paçoca': 5,
  'Leite Ninho': 4,
};
const fields = [
  { name: 'Granola', image: fruta1, value: 'Granola', price: 3 },
  { name: 'Paçoca', image: fruta2, value: 'Paçoca', price: 5 },
  { name: 'Leite Ninho', image: fruta3, value: 'Leite Ninho', price: 4 },
];

const ProductStepThree: React.FC<ProductStepThreeProps> = ({ register, togglePriceBar, price, setValue }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleCheckboxChange = async (value: string, isChecked: boolean, difference: number | null = null) => {
    if (difference) {
      const totalPrice = price - difference;
      togglePriceBar(totalPrice, false);
      setValue('stepThree.options', []);
      setValue('stepThree.price', 0);
      return localStorage.removeItem('selectedCheckboxValues');
    }
  
    const updatedOptions = isChecked
      ? [...selectedOptions, value]
      : selectedOptions.filter((option) => option !== value);
  
    setSelectedOptions(updatedOptions);
  
    const optionPriceDifference = optionPrices[value] || 0;
  
    const totalPrice = price + (isChecked ? optionPriceDifference : -optionPriceDifference);
    togglePriceBar(totalPrice, false);
    setValue('stepThree.options', updatedOptions);
    setValue('stepThree.price', totalPrice);
    localStorage.setItem('selectedCheckboxValues', JSON.stringify(updatedOptions));
  };
  

  useEffect(()=>{
    const storedValues = localStorage.getItem('selectedCheckboxValues');
    if(storedValues && JSON.parse(storedValues).length > 0){
      (async () => {
        const resp = Object.entries(JSON.parse(storedValues)).map(async (opt) => {
          const option = opt[1] as keyof typeof optionPrices;
          const difference = optionPrices[option] || 0;
          return difference;
        });
      
        const totalDifference = (await Promise.all(resp)).reduce((acc, curr) => acc + curr, 0);
        handleCheckboxChange('undefined', true, totalDifference)
      })();
    }else{
      setValue('stepThree.price', 0);
      setValue('stepThree.options', []);
    } 
  },[])
  return (
    <>
    {fields.map((option, i)=>(
      <div key={option.value+i} className='d-flex justify-space my-20'>
        <label className='radio_label d-flex align-center'><img className='mr-10' src={option.image}/> {option.name}</label>
        <div className="checkbox_container">
          <input
            className='checkbox-custom'
            type="checkbox"
            value={option.value}
            onClick={(e: React.MouseEvent<HTMLInputElement>) => handleCheckboxChange(option.value, e.currentTarget.checked)}
            {...register('stepThree.options')}
          />
          <label className='radio_label'>+R${option.price}</label>
        </div>
      </div>
    ))}
    </>
  );
};


export default ProductStepThree;
