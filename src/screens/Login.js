import React, { useState } from 'react';
import '../App.scss';
import Header from '../components/Header';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [inputValue, setInputValue] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const onInputChange = (event) => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.table(inputValue);
  
      const response = await axios.post('https://localhost:7084/api/Customers/SignIn', {
        email: inputValue.email,
        password: inputValue.password
      });
  
      console.log(response);
  
      if (response.status === 200) {
        alert("Đăng nhập thành công");
        navigate('/');
      } else {
        alert("Đăng nhập thất bại");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message); // Hiển thị thông báo từ server
      } else {
        console.error("Đã xảy ra lỗi:", error);
        alert("Đăng nhập thất bại. Vui lòng thử lại sau.");
      }
    }
  }

  return (
    <div className='mt-16 px-16 auth-screen'>
      {/* header */}
      <Header />

      {/* content */}
      <div className='wrap-content'>
        <div className='left'></div>
        <div className='flex w-1/2 justify-center items-center right '>
          <div className='w-4/5 p-10 border'>
            <div className='text-center text-3xl font-bold'>Login</div>
            <div className='mt-4'>Email</div>
            <input className='border-black border rounded pl-2 w-full h-10'
              type="text"
              name="email"
              value={inputValue.email}
              onChange={onInputChange}
            />
            <div className='mt-2'>Password</div>
            <div className='relative'>
              <input
                className='border-black border rounded pl-2 w-full h-10'
                type="password"
                name="password"
                value={inputValue.password}
                onChange={onInputChange}
              />
            </div>
            
              <div className='rounded w-full bg-gray-800 h-14 flex justify-center items-center uppercase font-medium text-white cursor-pointer mt-4'>
              <button onClick={handleSubmit}>Login</button>
                
              </div>
            

            <div className='flex justify-center items-center mt-2 flex-col'>
              <div className='flex'>Khách hàng mới? <div to={'/register'} className='ml-2 text-blue-700 cursor-pointer'>
                <Link to='/register'>Sign Up</Link>
              </div></div>
              <div className='mt-2 px-8 text-center'>Bằng cách tiếp tục, bạn đồng ý chấp nhận Chính sách quyền riêng tư và Điều khoản dịch vụ của chúng tôi.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
