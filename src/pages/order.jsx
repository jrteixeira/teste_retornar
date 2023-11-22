import React, { useState } from 'react'
import MainLayout from '../components/layout/mainLayout'
import urlAcai from '../assets/images/banner_acai.png'
import urlArrowBack from '../assets/images/arrow_back.svg'
import urlEstrela from '../assets/images/estrela.png'
import OrderForm from '../components/forms/order'
import PriceBarComponent from '../components/PriceBar'
import { useDispatch } from 'react-redux'
import { showPriceBar } from '../redux/reducers/priceBarReducer'
import { useNavigate } from 'react-router-dom'

const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const [step, setStep] = useState(1)
    function updateStep(evt){
        const newStep = evt === 'inc'?step + 1 : step - 1
        setStep(newStep)
        if(newStep === 4) 
        dispatch(showPriceBar(false));
    }
    const titleLabels = [
        {title:'Escolha o tamanho', sub:'Escolha pelo menos 1 opção.'},
        {title:'Escolha uma fruta', sub:'Escolha pelo menos 1 opção.'},
        {title:'Escolha complementos', sub:'Escolha até 3 opções.'},
        {title:'Confirme seu pedido', sub:'Revise as opções que escolheu.'},
    ]
    const goHome = ()=>{
        navigate("/");
    }
  return (
    <MainLayout>
        <div className="product_container">
            <div className="product_image">
                <img className='first' src={urlArrowBack} alt="voltar" onClick={()=>goHome()} />
                <img className='second' src={urlAcai} alt="imagem ilustrativa de um açai" />
            </div>
            <div className="product_content">
                <div className='title'>Açaí Natural</div>
                <div className="reviews_container">
                    <img src={urlEstrela} width={17} height={17} alt="estrela de avaliações" />
                    <span className='note'>4.5</span>
                    <span className="reviews_quantity">(30+)</span>
                    <span className="show_reviews">
                        Ver Avaliações
                    </span>
                </div>
                <p className="description_text">
                Super Copo de 500 ml de Açaí Tradicional - Atenção: Contém somente açaí puro! 
                Ideal para quem gosta de aproveitar um açaí puro ou rechear do seu jeito!
                    Obs: não trocamos nem adicionamos itens a esse copo!
                </p>
                <section className="form_container">
                    <div className="section_header">
                        <div className="text">
                            <p className='principal'>{titleLabels[step - 1].title}</p>
                            <p className="secondary">{titleLabels[step - 1].sub}</p>
                        </div>
                        <div className="step">
                            <span>{`${step}/4`}</span>
                        </div>
                    </div>
                    <OrderForm updateStepCallback={updateStep} step={step} />
                </section>
            </div>
            <PriceBarComponent updateStepCallback={updateStep} step={step} />
        </div>
    </MainLayout>
  )
}

export default Product