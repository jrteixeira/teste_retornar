import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { showPriceBar, editPrice, disablePriceBar, editShipping } from '../../../redux/reducers/priceBarReducer';
import { RootState } from '../../../redux/RootState';
import ProductStepOne from './productStepOne';
import ProductStepTwo from './productStepTwo';
import ProductStepThree from './productStepThree';
import { useSelector } from 'react-redux';
import ProductConfirmOrder from './productConfirmOrder';
import backIcon from '../../../assets/images/back.svg'
import { useNavigate } from 'react-router-dom';
import OrderSchema from '../validations/OrderSchema';
import postOrder from '../../../assets/functions/PostOrder';


type FormData = {
  stepOne: { size: string; price: number };
  stepTwo: { flavor: string; price: number };
  stepThree: { options: string; price: number };
};
interface ProductFormProps {
  updateStepCallback: Function;
  step: number;
}

const ProductForm: React.FC<ProductFormProps> = ({ step, updateStepCallback }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { price, shipping } = useSelector((state: RootState) => state.priceBar);
  const quantity = useSelector((state: RootState) => state.priceBar.quantity);
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<FormData>({
    resolver: async (data) => {
      try {
        await OrderSchema.parse(data);
        return { values: data, errors: {} };
      } catch (error) {
        const validationError = error as { errors: Record<string, string> };
        return { values: {}, errors: validationError.errors || {} };
      }
    },
  });

  const togglePriceBar = (price: number, keepHide: boolean = false) => {
    dispatch(showPriceBar(true));
    updatePrice(price);
    if(step >= 2) dispatch(disablePriceBar(keepHide));
  };

  const updatePrice = (price: number) => {
    dispatch(editPrice(price));
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await postOrder(data, quantity, price, shipping)
    dispatch(disablePriceBar(false))
    navigate("/orders");
  };
  
  const prevPage = ()=>{
    dispatch(disablePriceBar(step === 2 || step === 4?false:true))
    dispatch(showPriceBar(true));
    updateStepCallback('dec')
  }

  return (
    <>
    <img src={backIcon} width={25} alt="voltar para a etapa anterior" className={`${step == 1 || step === 4? 'd-none':''}`}
    style={{marginTop: '6px', marginBottom: '-20px'}} onClick={prevPage} />
    <form onSubmit={handleSubmit(onSubmit)}>
      {step === 1 && <ProductStepOne register={register} togglePriceBar={togglePriceBar} setValue={setValue} />}
      {step === 2 && <ProductStepTwo price={price} register={register} togglePriceBar={togglePriceBar} setValue={setValue} />}
      {step === 3 && <ProductStepThree price={price} register={register} togglePriceBar={togglePriceBar} setValue={setValue} />}
      {step === 4 && <ProductConfirmOrder getValues={getValues} />}
      <div className={`conclude_button_container ${step < 4? 'd-none':''}`}>
        <button className='back' onClick={(e)=>{
          e.preventDefault()
          dispatch(editShipping(0));
          prevPage()}}>Voltar</button> 
        <section>
            <span className='span_total'>Total:</span>
            <label className='label_price'>{`R$${(price + shipping) * quantity}`}</label>
            <button className='styled_button' type="submit">
              <span className='label_1'>Finalizar</span>
            </button>
        </section>
        </div>
    </form>
    </>
  );
};

export default ProductForm;
