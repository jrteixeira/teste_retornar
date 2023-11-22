import React, { ReactNode } from 'react';
import logo from '../../assets/images/logo.svg';
import orders from '../../assets/images/pedidos.svg';
import { useNavigate } from 'react-router-dom';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const goHome = ()=>{
    navigate("/");
  }
  const goOrders = ()=>{
    localStorage.removeItem('selectedCheckboxValues');
    localStorage.removeItem('selectedstepTwoValue');
    navigate("/orders");
  }
  return (
    <div className='app_container'>
      <header className='header'>
        <div className='header_content pointer' onClick={()=>goHome()}>
            <img src={logo} alt="peca acai logomarca" />
            <span className='title'>peça açaí</span>
        </div>
        <div className='product_btn' onClick={()=>goOrders()}>
          <span>Meus pedidos</span>
        <img className='ml-5' src={orders} alt="pedidos feitos" title='Pedidos feitos'/>
        </div>
      </header>

      <main>{children}</main>
      <footer>
        
      </footer>
    </div>
  );
};

export default MainLayout;
