import '../App.scss';
import {
 Link
} from "react-router-dom";
import { categories, categories1 } from '../fakeData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { addProduct } from '../store/productSlice';
import { useSelector, useDispatch } from "react-redux";



function App() {
  const dispatch = useDispatch();
  const [productCategory, setproductCategory] = useState();
  const [productList, setProductList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(12);
  var nf = new Intl.NumberFormat()
  const navigate = useNavigate();

  const onAddProduct=(e)=> () =>{    
    dispatch(addProduct({ ...e, quantity: 1}));
    alert("Bạn đã thêm thành công sản phẩm vào giỏ hàng")

  }
  useEffect(() => {
    const callApi = async () => {
        try {
            const response = await axios.get('https://localhost:7084/api/ProductCategories');
            setproductCategory(response.data);
            console.log(response)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    callApi();
}, []);

useEffect(() => {
  const callApi = async () => {
      try {
          const response = await axios.get(`https://localhost:7084/api/Products?pageNumber=${pageNumber}&pageSize=${pageSize}`);
          setProductList(response.data);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };

  callApi();
}, [pageNumber, pageSize]);
  return (
    <div>
      {/* header */}
      <Header />

      {/* trademark */}
      <div className='flex flex-row move-down'>
        <div className='flex flex-col w-1/2 justify-center items-center'>
          <div className='text-6xl font-bold text-center mx-20'>FRUIT FRESH 
          Vegetable 100% Organic.</div>
          <div className='text-xl mt-10'>Free Pickup and Delivery Available.</div>
        </div>
        <div className='flex w-1/2 img-hero' />
      </div>
      <div className='justify-center items-center flex mt-20'>
        <div className='w-5/6 '>
        <Carousel/>  
        </div>
      </div>
      <div className='text-4xl mt-32 text-center font-bold'>
        <p>Featured Product</p>  
        <hr/>             
      </div>

      <section id="Projects" className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
          {productList.map((e,i)=>(
                <div className="w-56 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl" >       
                <img src={`https://localhost:7084/image/${e.image}`} alt={e.title} className="h-52 w-56 object-cover rounded-t-xl" onClick = {() =>  navigate(`/detail/${e.id}`)}/>
                  <div className="px-4 py-3 w-72">
                      <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
                      <p className="text-lg font-bold text-black truncate block capitalize">{e.name}</p>
                      <div className="flex items-center">
                          <p className="text-lg font-semibold text-black cursor-auto my-3">{nf.format(e.price)}đ</p>                     
                          <div  onClick={onAddProduct(e)}  className="ml-20"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                  fill="currentColor" class="bi bi-bag-plus" viewBox="0 0 16 16">
                                  <path fill-rule="evenodd"
                                      d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                  <path
                                      d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                              </svg>
                            </div>
                      </div>
                  </div>     
                </div>
            ))}
          </section>   
        <div className='text-4xl mt-32 text-center font-bold'>
            <p>From The Blog</p>  
            <hr/>             
          </div>
          {productCategory && (
          <section className="py-6 sm:py-12 dark:bg-gray-100 dark:text-gray-800 flex">
            {productCategory.map((e, i) => (
              <div className="container p-6 mx-auto space-y-8 " key={i}>
                <div className="grid grid-cols-1 gap-x-4 gap-y-8 ">
                  <article className="flex flex-col dark:bg-gray-50">
                    <a rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum">
                      <img alt="" className="object-cover w-full h-52 dark:bg-gray-500" src={`https://localhost:7084/image/${e.image}`} />
                    </a>
                    <div className="flex flex-col flex-1 p-6">
                      <a rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum"></a>
                      <a rel="noopener noreferrer" href="#" className="text-xs tracking-wider uppercase hover:underline dark:text-violet-600">Convenire</a>
                      <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">Te nulla oportere reprimique his dolorum</h3>
                      <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-600">
                        <span>June 1, 2020</span>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            ))}
          </section>
        )}

      <hr/>
      {/* category */}
   
      <Footer/>
    </div>
  );
}

export default App;
