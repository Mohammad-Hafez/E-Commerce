import React ,  { useContext } from 'react'
import ApiBaseUrl from '../BaseUrl'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios  from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
import Loading from '../Loading/Loading'
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';
export default function SelectedCategory() {
  let { addToCart, setNumbOfCartItems } = useContext(cartContext);
  const [buttonLoading, setButtonLoading] = useState([]);
  const [Category, setCategory] = useState()
  const [AllCategoryProducts, setAllCategoryProducts] = useState([])
  let {id} = useParams()
  async function getCategory() {
    let {data} = await axios.get(ApiBaseUrl + `/api/v1/categories/${id}`);
    console.log(data);
    setCategory(data.data)
  }
  async function getProducts() {
    let {data} = await axios.get(ApiBaseUrl + '/api/v1/products');
    setAllCategoryProducts(data?.data);
    let filteredProducts = data?.data?.filter(product => product.category._id === id);
    setAllCategoryProducts(filteredProducts);
    setButtonLoading(new Array(data.data.length).fill(false));
  }
  async function addProduct(productId, index) {
    let newButtonLoading = [...buttonLoading];
    newButtonLoading[index] = true;
    setButtonLoading(newButtonLoading);
    try {
      let response = await addToCart(productId);
      if (response?.data?.status == 'success') {
        setNumbOfCartItems(response.data.numOfCartItems);
        toast.success(response.data.message, {
          className: 'first-z mt-5 bg-main-light ',
          duration: 2000,
        });
      }else {
        toast.error('An Error Occurred', {
          className: 'first-z mt-5 bg-main-light ',
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error('An Error Occurred', {
        className: 'first-z mt-5 bg-main-light ',
        duration: 2000,
      });
    }
      newButtonLoading[index] = false;
      setButtonLoading(newButtonLoading);
  }
  useEffect(()=>{
    getCategory()
    getProducts()
  },[])
  return <>
    <Helmet>
      <title>Category Products</title>
    </Helmet>
    <div className="container mb-2">
    {Category ?  <>
      <div className="row align-items-center text-center bg-main-light rounded mt-2 ">
        <div className="col-md-6 p-2 ">
        <img src={Category?.image} className='w-100 rounded categoryContainer' alt="" />
        </div>
        <div className="col-md-6 px-3">
          <div className="CategoryDetails">
          <h2 className='h5 fw-bold w-100'>
            Category Name: <span className=' ms-2 text-main'>{Category?.name}</span>
          </h2>
          <h2 className='h5 fw-bold w-100'>
          Created At : <span className='ms-2 text-main'>{Category?.createdAt.slice(0,10)}</span>
          </h2>
          <h2 className='h5 fw-bold'>
            Uploaded At : <span className='ms-2 text-main'>{Category?.updatedAt.slice(0,10)}</span>
          </h2>
          </div>
        </div>
      </div>
      <div className="row">
          {AllCategoryProducts.map((product, index) => (
            <div key={product.id} className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
              <div className="product px-2 py-3">
                <Link to={`/product-details/${product.id}`}>
                  <img src={product.imageCover} className="w-100 rounded" alt="" />
                  <p className="text-main">{product.category.name}</p>
                  <h3 className="h6">{product.title.split(' ').splice(0, 2).join(' ')}</h3>
                  <div className="d-flex justify-content-between">
                    <p>{product.price} EGP</p>
                    <div>
                      <i className="fa fa-star rating-color me-1"></i>
                      {product.ratingsAverage}
                    </div>
                  </div>
                </Link>
                {buttonLoading[index] ? (
                  <button className="btn bg-main text-white w-100" disabled>
                    <i className="fa fa-spin fa-spinner"></i>
                  </button>
                ) : (
                  <button onClick={() => addProduct(product._id, index)} className="btn bg-main text-white w-100">
                    + Add
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        </>
    :
    <Loading/>}
     </div>
    </>
}
