import React, { useState, useEffect } from 'react'
import MainLayout from '../components/layout/mainLayout'
import urlAcai from '../assets/images/banner_acai.png'
import backIcon from "../assets/images/back.svg"
import {calculateDeadline} from '../assets/functions/DeliveryCalculator';
import { useNavigate } from 'react-router-dom';
import formatHours from '../assets/functions/FormatHours';

const sizes = {
    'pequeno': '300ml',
    'medio': '500ml',
    'grande': '700ml',
}
const Orders = () => {
    const [data, setData] = useState(null)
    useEffect(()=>{
        fetch('https://655d34699f1e1093c5991bf6.mockapi.io/api/v1/order')
        .then(response => response.json())
        .then(resp => setData(resp) );
    
    },[])
    const navigate = useNavigate();
    const goHome = ()=>{
        navigate("/");
    }
  return (
    <MainLayout>
        <div className="orders_container">
            <span className='title'>Meus Pedidos</span>
            <img src={backIcon} width={25} alt="voltar para a etapa anterior"
    style={{cursor: 'pointer'}} onClick={goHome} />
            <span className='subtitle'>Pedidos ativos</span>
            {data && 
            <>
                {data.map((order)=>(
                <div key={order.id} className="order_card">
                    <div className="first">
                        <div className="order_image">
                            <img src={urlAcai} alt="imagem ilustrativa de um açai" />
                        </div>
                        <div className="order_content">
                            <p className='item'>{order.quantity} item</p>
                            <p className='title justify-left'>Açaí Natural</p>
                            <ul>
                                <li className="item">- {order.product.size} - {sizes[order.product.size]}</li>
                                <li className="item">- {order.product.flavor}</li>
                                <li className="item">- {order.product.options.join(', ')}</li>
                            </ul>
                        </div>
                        <span>#0010966456</span>
                    </div>
                    <p className='hr'></p>
                    <div className="second">
                        <section>
                            <p className='item'>Previsão de entrega</p>
                            <p className='secondary_item'>{order.createdDate} - {formatHours(order.createdDate, calculateDeadline(order.product.size))} ({calculateDeadline(order.product.size)} minutos)</p>
                        </section>
                        <section>
                            <p className='item'>Valor total</p>
                            <p className='secondary_item'>R${order.product.price},00</p>
                        </section>
                    </div>
                    <div className="tirth">
                        <button className='help w-100 justify-center'>Ajuda</button> 
                        <button className='styled_button w-100 justify-center'>
                            <span className='label_1'>Rastrear pedido</span>
                        </button>
                    </div>
                </div>
                ))}
            </>
            }
        </div>
    </MainLayout>
  )
}

export default Orders