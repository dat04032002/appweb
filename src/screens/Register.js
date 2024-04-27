import React, { useState } from 'react';
import '../App.scss';
import Header from '../components/Header';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Register() {
  const [inputValue, setInputValue] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const onInputChange = (event) => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputValue.email)) {
      setErrorMessage('Email không đúng định dạng.');
      return;
    }

    // Kiểm tra độ dài password
    if (inputValue.password.length < 8) {
      setErrorMessage('Password phải có ít nhất 8 ký tự.');
      return;
    }

    try {
      const response = await axios.post('https://localhost:7084/api/Customers', inputValue);
      console.log('check post', response);
      if (response.status === 201) {
        alert('Bạn đã đăng ký thành công');
      }
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage('Email đã tồn tại.');
      } else {
        setErrorMessage('Đã có lỗi xảy ra.');
      }
    }
  };

  return (
    <div className='mt-16 px-16 auth-screen'>
      <Header />
      <div className='wrap-content'>
        <div className='left'></div>
        <div className='flex w-1/2 justify-center items-center right'>
          <div className='w-4/5 p-10 border'>
            <div className='text-center text-3xl font-bold'>Sign Up</div>
            <form onSubmit={handleSubmit}>
            <div className='mt-2'>Họ Và Tên</div>
              <input  className='border-black border rounded pl-2 w-full h-10' 
                id="grid-first-name" 
                type="text" 
                name="name"
                value={inputValue.name}
                onChange={onInputChange}
              />
            <div className='mt-2'> Địa Chỉ</div>
              <input  className='border-black border rounded pl-2 w-full h-10' 
                id="grid-address" 
                type="text" 
                name="address"
                value={inputValue.address}
                onChange={onInputChange}
              />
            <div className='mt-2'>Số Điện Thoại</div>
              <input  className='border-black border rounded pl-2 w-full h-10' 
                id="grid-phoneNumber" 
                type="text" 
                name="phoneNumber"
                value={inputValue.phoneNumber}
                onChange={onInputChange}
              />
            <div className='mt-2'>Email</div>
              <input  className='border-black border rounded pl-2 w-full h-10' 
                id="grid-email" 
                type="text" 
                name="email"
                value={inputValue.email}
                onChange={onInputChange}
              />

            <div className='mt-2'>Password</div>
            <div className='relative'>
              <input
                placeholder='Mật khẩu ít nhất 8 kí tự'
                className='border-black border rounded pl-2 w-full h-10'
                type={'password'}
                id="grid-password" 
                name="password"
                value={inputValue.password}
                onChange={onInputChange}
              />
            </div>
              <div className='rounded w-full bg-gray-800 h-14 flex justify-center items-center uppercase font-medium text-white cursor-pointer mt-4'>
                <button type='submit'>Sign up</button>
              </div>
            </form>
            {errorMessage && <div className='text-red-500 mt-2'>{errorMessage}</div>}
            <div className='flex justify-center items-center mt-2 flex-col'>
              <div className='flex'>
                Already have an Account?
                <Link to='/login'><div  className='ml-2 text-blue-700 cursor-pointer'>
                  Login
                </div>
                </Link>
                
              </div>
              <div className='mt-2 px-8 text-center'>
                By continuing, you agree to accept our Privacy Policy & Terms of Service.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
