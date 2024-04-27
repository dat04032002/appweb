import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { categories } from '../fakeData';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';


const Carousel = () => {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(12);

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
    dots: true, 
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    lazyLoad: true,
    focusOnSelect: true,
    autoplaySpeed: 1000,
    nextArrow: (
        <div>
          <div className="next-slick-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" stroke="black" height="24" viewBox="0 -960 960 960" width="24"><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/></svg>
          </div>
        </div>
      ),
  
      prevArrow: (
        <div>
          <div className="next-slick-arrow rotate-180">
            <svg xmlns="http://www.w3.org/2000/svg" stroke="black" height="24" viewBox="0 -960 960 960" width="24"><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/></svg>
          </div>
        </div>
      ),
  };
  return (
    <div className="app mt">
      <Slider {...settings}>
        {data.map(item => (
          <div>
            <img src={`https://localhost:7084/image/${item.image}`} alt={item.title}  className='w-52 h-56'/>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
