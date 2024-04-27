import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSelector, useDispatch } from "react-redux";
import { removeProduct, decreaseQuantity, increaseQuantity, } from '../store/productSlice'
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel'

export default function Cart() {
  var nf = new Intl.NumberFormat()
  const dispatch= useDispatch();
  const listTaskStore = useSelector((state) => state.product.productList);
  console.log(listTaskStore)

  const totalPrice = listTaskStore.reduce((acc, item) => acc + item.price*item.quantity, 0);

  const onRemoveItem= (item)=>()=>{
    dispatch(removeProduct(item));
  }; 
   const onChangeQuantity = (type, item) => () => {
    if (type === 'decrease') {
      dispatch(decreaseQuantity(item));
    } else {
      dispatch(increaseQuantity(item));
    }
  };
  

  return (

    <div>
    <Header/>
    <div className='mt-16 px-16'> 
    <div className='text-4xl font-bold mb-4'>Sản phẩm trong giỏ hàng </div>       
        <div className='flex flex-row'>      
          <div className='flex-1 mr-8'>
          {listTaskStore?.map(item=>{          
            return(            
              <div  key={item?.id} className='flex flex-row hover:border-2 p-2 mb-6'>                   
              <img src={`https://localhost:7084/image/${item.image}`}  alt={'shoes'} className='object-cover w-40 h-40' />         
              <div className='ml-4 w-full'>              
                <div className='flex justify-between'>
                  <div className='font-bold'>{item?.name}</div>                
                </div>          
                <div className='font-bold'>{item?.description}</div>
                <div className='flex flex-row my-4'>                 
                  <div className='flex flex-row'>
                    <div className='mr-2'>Khối Lượng</div>
                    <div className='flex flex-row'>
                      <div  onClick={onChangeQuantity('decrease', item)} className='h-6 w-6 bg-gray-200 flex justify-center items-center cursor-pointer'>-</div>
                      <div className='h-6 w-6 bg-gray-300 flex justify-center items-center'>{item?.quantity} </div>
                      <div onClick={onChangeQuantity('increase', item)} className='h-6 w-6 bg-gray-200 flex justify-center items-center cursor-pointer'>+</div>                   
                    </div>
                  </div> 
                  <div className='text-rose-600 ml-10'>
                  {nf.format(item?.price)}đ
                  </div>                
                </div>
                <div className='flex flex-row mt-4'>              
                  <div onClick={onRemoveItem(item)} className='bg-gray-800 h-8 rounded px-2 flex justify-center items-center uppercase text-white cursor-pointer'>Xóa sản phẩm</div>
                </div>
              </div>
            </div>        
            )       
          })}  
          </div>
         <div className='w-72 border-2 h-64'>
          <div className='text-2xl font-bold'>Số Lượng:</div>       
            <div className='flex justify-between mb-4 pl-2 mt-4'>
              <div>Gía gốc:</div>
              <div className='text-xl'>{nf.format(totalPrice)}đ</div>
            </div>
            <div className='flex justify-between mb-4 pl-2'>
              <div>Gỉam giá:</div>
              <div className='text-green-500'>-0đ</div>
            </div>
            <div className='flex justify-between mb-4 pl-2'>
              <div>phí vận chuyển:</div>
              <div className='text-green-500'>FREE:</div>
            </div>
            <div className='flex justify-between font-bold mb-4 pl-2'>
              <div>Tổng tiền:</div>
              <div className='text-xl text-rose-600'>{nf.format(totalPrice)}đ</div>
            </div>
            <Link to='/payment'>  <div className='w-full bg-gray-800 h-14 flex justify-center items-center uppercase font-medium text-white cursor-pointer   hover:bg-red-600 '>
              THANH TOÁN
            </div></Link>
          
          </div>
        </div>       
      </div>
      <div className='justify-center items-center flex mt-20'>
        <div className='w-5/6 '>
        <Carousel/>  
        </div>
      </div> 
      <div className='mt-40'>
        <Footer/>
      </div>
      
    </div>
   
  )
}
