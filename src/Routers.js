import React from 'react';
import {
  BrowserRouter, Routes, Route, Link
} from "react-router-dom";
import Home from './screens/Home';
import Product from './screens/Products';
import Detail from './screens/Detail';
import Cart from './screens/Cart';
import Thanks from './screens/Thanks';
import Payment from './screens/Payment';

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/payment" element={<Payment />} />      
      </Routes>
    </BrowserRouter>
  );
}
