import React ,{ useContext } from 'react'
import ApiBaseUrl from '../BaseUrl'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Axios  from 'axios'
import { useState } from 'react'
import Slider from "react-slick";
import Loading from '../Loading/Loading'
import { cartContext } from '../../Context/CartContext'
import {Helmet} from "react-helmet";
import { toast } from 'react-hot-toast'
export default function ProductDetails() {
  const [productDetails ,setProductDetails]=useState([]);
  const [AddLoader, setAddLoader] = useState(false)
  let {addToCart , setNumbOfCartItems} = useContext(cartContext)
  async function addProduct(productId){
    setAddLoader(true)
    let response = await addToCart(productId)
    if (response?.data?.status == 'success') {
      setNumbOfCartItems(response.data.numOfCartItems);
      toast.success(response.data.message , {
        className : 'first-z mt-5 bg-main-light ',
        duration:2000
      })
    }else{
      toast.error( 'An Erorr Occured' , {
        className : 'first-z mt-5 bg-main-light ',
        duration:2000})
    }
    setAddLoader(false)
  }
  let {id} = useParams()
  // Slider Settings
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  // To Get Selected Product Details
  async function getProductDetails(){
      let {data} = await Axios.get(ApiBaseUrl + `/api/v1/products/${id}`);
      setProductDetails(data.data);
  }
    // To Show Selected Product Details 
  useEffect(()=>{getProductDetails()},[])
  return <>
     <Helmet>
      <title>Fresh Cart | Product Details</title>
    </Helmet>

  <div className="container py-5 position-relative">
    { productDetails.length != 0 ?
    <div className="row align-items-center gy-4">
    <div className="col-md-4">
      <Slider {...settings}>
        {productDetails?.images?.map((img , index)=><img className='w-100 h-50' key={index}  src={img} alt="category Image" />)}
      </Slider>  
    </div>
    <div className="col-md-8">
      <h1>{productDetails.title}</h1>
      <h3>Brand : <span className='text-main'>{productDetails.brand.name}</span> </h3>
      <p>{productDetails.description}</p>
      
      <div className="d-flex justify-content-between">
          <p>{productDetails.price} EGP</p>
          <div>
          <i className='fa fa-star rating-color'></i>
          {productDetails.ratingsAverage}
          </div>
      </div>
      {AddLoader ?
      <button className="btn bg-main text-white w-100" disabled>
          <i className="fa fa-spin fa-spinner"></i>
      </button>
        :
      <button onClick={()=> addProduct(productDetails._id)} className='btn bg-main text-white w-100'>+ Add</button>
      }
        </div>
  </div>
:
<Loading/>
}
  </div>
  </>
  
}



