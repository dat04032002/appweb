import React from 'react';
import {
  Link
} from "react-router-dom";
import {
  FaSearch, FaUser, FaShoppingCart,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

export default function Header() {

  return (
    <div>
      <div className='flex flex-row h-14 items-center fixed w-full top-0 z-50'>
        <div className='flex flex-1 flex-row bg-slate-200 px-20 items-center h-full'>
          <div className='text-gray-300 text-4xl mr-auto cursor-pointer font-bold'>FruitStore</div>
          <div className='flex flex-row'>
            <Link to='/'>
              <div className='page-link mr-10 cursor-pointer w-20'>Trang Chủ</div>
            </Link>
            <Link to='/product'>
              <div className='page-link cursor-pointer w-20'>Sản Phẩm</div>
            </Link>
          </div>
        </div>
        <div className='flex w-1/2 h-full flex-row items-center justify-between  bg-slate-200'>
          <div className='ml-4 relative w-64'>
            <input
              className='border rounded-full pl-2 w-full h-7'
              placeholder='Search here'
            />
            <FaSearch className='absolute top-1.5 right-2.5' />
          </div>
          <div className='flex flex-row'>
            <Link to='/login'>
              <FaUser className='text-2xl mr-10 text-gray-300' />
            </Link>

            <Link to='/cart'>
              <FaShoppingCart className='text-2xl mr-10 text-gray-300' />
            </Link>
            <FiLogOut className='text-2xl mr-10 text-gray-300' />
          </div>
        </div>
      </div>
    </div>
  );
}
