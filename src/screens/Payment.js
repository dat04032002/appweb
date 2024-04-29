import React from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { useSelector, useDispatch } from "react-redux";
import { useState,useEffect } from 'react';
import Footer from '../components/Footer';
export default function Payment() {
    const listTaskStore = useSelector((state) => state.product.productList);
    const totalPrice = listTaskStore.reduce((acc, item) => acc + item.price*item.quantity, 0);
    const[paymentRequest,setpaymentRequest]=  useState()
    var nf = new Intl.NumberFormat()
    const[input, setinput]=useState({
      order_list: "",
      product_id: ""
    })
    const onchaneinput=(event)=>{
        setpaymentRequest({...paymentRequest,[ event.target.name ] : event.target.value })
    }
    const VNPAY=async ()=>{
      
       
        try {
            const chitiet=listTaskStore.map(item=>{
                return {IdProduct: item.id,Price: item.price, Quantity: item.quantity,Id:0,IdOrder:0,Name:paymentRequest.name,Address:paymentRequest.address,PhoneNumber:paymentRequest.phoneNumber,PriceSum:totalPrice,Orderdate:new Date()}
            })
           
            var myJsonString = JSON.stringify(chitiet);
        const res = await axios.post('https://localhost:7084/api/Orders/ProcessPayment',myJsonString,{
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if(res.status==200){
            alert("Thanh toán  thành công")
            const newWindow = window.open(res.data, '_blank', 'noopener,noreferrer');
            if (newWindow) newWindow.opener = null;
          }else{
            alert("Thanh toán không thành công")
          }
        console.log(res);
    } catch (error) {
     console.log(error);
        alert("Thanh toán không thành công")
      }
    }
  return (
    <div   className='bg-slate-100 h-full'>
    <Header /> 
    <div className=' flex mt-16'>
        <div className=' w-3/5  mr-32'>
            {listTaskStore?.map(item=>{          
                return(            
                <div  key={item?.id} className='flex border-2 border-gray-200 flex-row hover:border-2 p-2 mb-6 ' >                   
                <img src={`https://localhost:7084/image/${item.image}`}  alt={'shoes'} className='object-cover w-40 h-40' />         
                    <div className='ml-4 w-full'>              
                        <div className='flex justify-between'>
                            <div className='font-bold'>{item?.name}</div>                
                        </div>          
                            <div className='font-bold'>{item?.description}</div>
                        <div className='flex flex-row my-4'>                 
                            <div className='flex flex-row'>
                                <div className='mr-2'>Khối Lượng </div>
                                {item?.quantity}:    Kg
                            </div> 
                                <div className='text-rose-600 ml-10'>
                                {nf.format(item?.price)}đ
                            </div>                
                        </div>
                    </div>
                </div>        
            )       
        })} 
        </div>
        <div className='justify-center items-center  fixed backdrop-blur-sm   contents '  >
                <div className="border rounded-lg border-gray-300 p-4h-1/2 w-1/2">
                <div className="flex justify-end">
                </div>             
                    <form className="w-full max-w-lg bg-slate-100 ml-10 mt-4">
                        <div className="flex flex-wrap -mx-3 mb-6">
                         <div className="w-full px-3 mb-6 md:mb-0  ">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name text 2xl flex">
                                    Tổng số tiền:  <p className='text-xl text-rose-600'>{nf.format(totalPrice)}đ</p>
                                </label>                         
                               
                            </div>              
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0 ">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Tên Của Bạn:
                                </label>
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    id="grid-first-name" 
                                    type="text" 
                                    name="name"
                                    // value={inputvalue.name}
                                     onChange={onchaneinput}
                                />                  
                            </div>

                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0 ">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                   Địa Chỉ:
                                </label>
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    id="grid-first-name" 
                                    type="text" 
                                    name="address"
                                    // value={inputvalue.name}
                                     onChange={onchaneinput}
                                />                  
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                               Số Điện Thoại:
                                </label>
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  
                                    id="grid-first-name"
                                    type="text"
                                    name="phoneNumber"
                                    // value={inputvalue.quantity}
                                     onChange={onchaneinput} 
                                />                  
                            </div>
                           
                            
                        </div> 
                        <div className='w-full bg-gray-800 h-14 flex justify-center items-center uppercase font-medium text-white cursor-pointer   hover:bg-red-600 '>
                        THANH TOÁN KHI NHẬN HÀNG
                        </div>   
                        <div className='mt-5 w-full bg-gray-800 h-14 flex justify-center items-center uppercase font-medium text-white cursor-pointer   hover:bg-red-600 '  onClick={VNPAY}>
                        THANH TOÁN TRỰC TUYẾN VNPAY
                        </div>     
                    </form>
                </div>
            </div>
    </div> 
    <div className='mt-10'>

    </div>
    <Footer/>     
</div>
  )
}

