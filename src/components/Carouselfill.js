import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { categories } from '../fakeData';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';


const Carouselfill = () => {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(12);
  var nf = new Intl.NumberFormat()

  useEffect(() => {
    const callApi = async () => {
        try {
            const response = await axios.get(`https://localhost:7084/api/Products?pageNumber=${pageNumber}&pageSize=${pageSize}`);
            setData(response.data);
            console.log(response)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    callApi();
}, [pageNumber, pageSize]);

  const settings = {
    dots: false, 
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    lazyLoad: true,
    focusOnSelect: false,
    autoplaySpeed: 1000,
    
  };
  return (
    <div className="app mt z-1000">
      <Slider {...settings}>
        {data.map(item => (
            <div className=''>
                <div className='mb-5 flex ' >
                  <img src={`https://localhost:7084/image/${item.image}`} alt={item.title} className='w-32 h-36' />
                  <div className='ml-5 text-lg font-bold text-black truncate block capitalize mt-5'>
                   {item.name}  
                   <div className='mt-5'> {nf.format(item.price)}đ  </div>                 
                  </div> 
                              
                </div>
                <div className='mb-5 flex'>
                  <img src={`https://localhost:7084/image/${item.image}`} alt={item.title} className='w-32  h-36' />
                  <div className='ml-5 text-lg font-bold text-black truncate block capitalize mt-5'>
                   {item.name}  
                   <div className='mt-5'> {nf.format(item.price)}đ  </div>                 
                  </div> 
                </div>
                <div className='flex'>
                  <img src={`https://localhost:7084/image/${item.image}`} alt={item.title} className='w-32 h-36' />
                  <div className='ml-5 text-lg font-bold text-black truncate block capitalize mt-5'>
                   {item.name}  
                   <div className='mt-5'> {nf.format(item.price)}đ  </div>                 
                  </div> 
                </div>
            </div>
         
        ))}
      </Slider>
    </div>
  );
};

export default Carouselfill;
