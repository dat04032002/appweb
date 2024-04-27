import React from 'react';
import {
  BrowserRouter, Routes, Route, Link
} from "react-router-dom";
import Home from './screens/Home';
import Product from './screens/Products';
import Detail from './screens/Detail';
import Cart from './screens/Cart';
import Login from './screens/Login'
import Register from './screens/Register'
import Payment from './screens/Payment';

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />  
        <Route path="/payment" element={<Payment />} />      
      </Routes>
    </BrowserRouter>
  );
}
