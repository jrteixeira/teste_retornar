// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Order from './pages/order';
import Home from './pages/home';
import './assets/styles/App.css';
import Orders from './pages/orders';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="order/:product" element={<Order />} />
        <Route path="orders/" element={<Orders />} />
      </Routes>
    </Router>
  );
};

export default App;
