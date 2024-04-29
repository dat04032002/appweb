import React from 'react'
import Header from '../components/Header';
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";
import {addProduct} from '../store/productSlice'
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Detail() {
  var nf = new Intl.NumberFormat()
  const location=useParams();
  const[datadetall, setDatadetall]=useState()
  const dispatch=useDispatch();
  useEffect (()=>{
    const callApi = async () => {
      const response = await axios.get(`https://localhost:7084/api/Products/${location.id}`)   
       
      var data=response.data.filter(e=>{
         console.log(data)
        return e;
      })   
      setDatadetall(data[0])    
    }
    callApi();
    },[]);

    const onAddProduct=(datadetall)=> () =>{
     
      dispatch(addProduct({ ...datadetall, quantity: 1}));
      alert("Thêm thành công")
    }
  return (
    <div >
     <Header/>
      <div className='flex border-2 mt-20'>    
        <div className='w-1/3'>{datadetall?.image&&<img className='w-72 h-72 ml-32 mt-5' src={`https://localhost:7084/image/${datadetall?.image}`} alt=""/>}</div>
          <div className='flex flex-row mt-14 mb-8 w-2/3'>
            <div className=' px-8'>
              <div className='bg-gray-800 inline-block p-2 px-6 text-white font-bold'></div>
              <div className='text-4xl font-bold my-1'>{datadetall?.name}</div>
             
              <div className='my-2 border-dashed border-y-2 border-gray-500 py-4'>
                {datadetall?.description}
              </div>
              
              <div className='text-rose-600 text-3xl  '>{nf.format(datadetall?.price)}đ/ Kg</div>
              <div className='flex  '>
                <div onClick={onAddProduct(datadetall)} className=' bg-gray-800 h-11 flex justify-center items-center uppercase font-medium text-white cursor-pointer mt-20'>
                 Thêm vào giỏ
                </div>
               
              </div>
              
            </div>
          </div>
      </div>
      <div className='mt-20'> 
        <Footer/>
      </div>
    
    </div>
  )
}