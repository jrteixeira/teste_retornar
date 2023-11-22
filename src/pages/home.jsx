import React from 'react'
import MainLayout from '../components/layout/mainLayout'
import { Link } from 'react-router-dom'
import urlAcai from "../assets/images/banner_acai.png"

const home = () => {
  return (
    <MainLayout>
        <Link to="/order/acai">
          <div className="product">
            <div  className="product_card d-flex mt-0">
                <div className="product_image">
                    <img src={urlAcai} alt="imagem ilustrativa de um açai" />
                </div>
                <div className="product_content my-0 py-0">
                  <div className='title' style={{display: 'inline-block', color: '#1A1C1E'}}><span>Açaí Natural</span></div>
                  <div className="description">
                    <p>Desfrute da explosão de frescor e vitalidade em cada mordida! 🌿✨ Acompanhe nossa ação especial, repleta de deliciosas frutas frescas e saudáveis.</p>
                  </div>
                  <p className='product_price'>A partir de <b>R$18,00</b></p>
                </div>
            </div>
          </div>
        </Link>
    </MainLayout>

  )
}

export default home