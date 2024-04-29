import React from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { useSelector, useDispatch } from "react-redux";
import { useState,useEffect } from 'react';
import Footer from '../components/Footer';

export default function Thanks() {
   const img= `${require("../assets/images/th.jpg")}`
   useEffect(() => {
   

    localStorage.removeItem("productList");
}, []);
  return (
    <div   className='bg-slate-100 h-full'>
    <Header /> 
    <div className='justify-center items-center flex mt-16 w-full'>
        < img src={img} className='w-96'/>
           
    </div> 
    <h1 className='text-5xl w-full text-center mt-1'> CẢM ƠN BẠN ĐÃ MUA HÀNG CỦA CHÚNG TÔI</h1>
    <div className='mt-10'>
    
    </div>
    <Footer/>     
</div>)
}
