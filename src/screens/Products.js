import '../App.scss';
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { addProduct } from '../store/productSlice';
import { getProduct } from '../store/productThunkSlice';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import Carouselfill from '../components/Carouselfill';
 
function App() {
  var nf = new Intl.NumberFormat()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productList, setProductList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  
  //const productListData = useSelector(state => state.productThunk.productList);
 

  const onAddProduct=(e)=> () =>{    
    dispatch(addProduct({ ...e, quantity: 1}));
    alert("Bạn đã thêm thành công sản phẩm vào giỏ hàng")

  }

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

const handleNextPage = () => {
  setPageNumber(pageNumber + 1);
};

const handlePreviousPage = () => {
  if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
  }
};

const handlePageChange = (page) => {
  setPageNumber(page);
};



  return (
    <div>
        {/* header */}
        <Header />
        <div className="head ">FruitStore</div>
        {/* product */}
        <div className='product-container flex flex-row'>
          {/* filter column */}
          <div className='w-72 mr-10'>
            <div className='mt-6 flex flex-row items-center justify-between'>
              <div className='text-2xl font-bold'>Filter</div>
            </div>
            <div className='font-bold mt-2'>Price</div>
            <div className="flex flex-row justify-between w-11/12 mt-4">
              {[10, 50, 150,300, 500].map((item) => (
                <p key={item}>
                  {item}
                  <sup>$</sup>
                </p>
              ))}
            </div>
            <div className="">
              <input
                type="range"
                className="w-11/12"
                min={1}
                max={5}
              // value={2}
              // onChange={(e) => { }}
              />
            </div>

            <div className='font-bold mt-2'>Loại sản phẩm</div>
            <div>
              <input
                className='mr-1 ml-4 mt-4'
                type="checkbox"
                id="option4"
                name="vans"
              // checked={'vans'}
              // onChange={() => {}}
              />
              <label htmlFor="option4">Tất cả</label>
            </div>
            <div>
              <input
                className='mr-1 ml-4 mt-4'
                type="checkbox"
                id="option1"
                name="nike"
              // checked={'nike'}
              // onChange={() => {}}
              />
              <label htmlFor="option1">Hoa quả</label>
            </div>
            <div>
              <input
                className='mr-1 ml-4 mt-4'
                type="checkbox"
                id="option2"
                name="adidas"
              // checked={'adidas'}
              // onChange={() => {}}
              />
              <label htmlFor="option2">Rau củ</label>
            </div>
            <div>
              <input
                className='mr-1 ml-4 mt-4'
                type="checkbox"
                id="option3"
                name="puma"
              // checked={'puma'}
              // onChange={() => {}}
              />
              <label htmlFor="option3">Nước uống</label>
            </div>
            <div>
              <input
                className='mr-1 ml-4 mt-4'
                type="checkbox"
                id="option4"
                name="vans"
              // checked={'vans'}
              // onChange={() => {}}
              />
              <label htmlFor="option4">Sản phẩm bán chạy</label>
            </div>
            <div>
              <input
                className='mr-1 ml-4 mt-4'
                type="checkbox"
                id="option4"
                name="vans"
              // checked={'vans'}
              // onChange={() => {}}
              />
              <label htmlFor="option4">Sản phẩm hạ giá</label>
            </div>
            <div className=' mt-20'>
              <div className='text-2xl mt-32 font-bold mb-5'>
                <p>Featured Product</p>              
              </div>
                <div className=''>
                <Carouselfill/>  
                </div>
              </div>
          
          </div>

          {/* item column */}
        <div className='flex-1' >                           
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
            <div className=' flex justify-end mt-10'>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" onClick={handlePreviousPage} disabled={pageNumber === 1}/>
                </button>                                
                <button
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" onClick={handleNextPage}/>
                </button>
              </nav>
            </div>
        </div>
      </div>
      <div className='text-4xl mt-32 text-center font-bold'>
        <p>SALE OFF</p>  
        <hr/>             
      </div>
      <div className='justify-center items-center flex mt-20'>
        <div className='w-5/6 '>
        <Carousel/>  
        </div>
      </div>    
        <div>
          <Footer/>
        </div>
   </div>
  );
}

export default App;
