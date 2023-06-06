import React, { useEffect , useState } from 'react';
import ApiBaseUrl from '../BaseUrl'
import { useParams } from 'react-router-dom'
import axios  from 'axios'
import {Helmet} from "react-helmet";
import Loading from '../Loading/Loading'
import ShowProducts from '../ShowProducts/ShowProducts';

export default function SelectedCategory() {
  const [Category, setCategory] = useState()
  const [AllCategoryProducts, setAllCategoryProducts] = useState([])
  let {id} = useParams()
  async function getCategory() {
    let {data} = await axios.get(ApiBaseUrl + `/api/v1/categories/${id}`);
    setCategory(data.data)
  }
  async function getProducts() {
    let {data} = await axios.get(ApiBaseUrl + '/api/v1/products');
    let filteredProducts = data?.data?.filter(product => product.category._id === id);
    setAllCategoryProducts(filteredProducts);
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
      <div className="row align-items-center text-center bg-main-light rounded mb-3 mt-2 ">
        <div className="col-6 p-2 ">
        <img src={Category?.image} className='w-100 rounded categoryImg' alt="" />
        </div>
        <div className="col-6 px-3">
          <div className="CategoryDetails">
          <h2 className='h5 fw-bold w-100 d-flex'>
            Category Name: <span className=' ms-2 text-main'>{Category?.name}</span>
          </h2>
          <h2 className='h5 fw-bold w-100 d-flex'>
          Created At : <span className='ms-2 text-main'>{Category?.createdAt.slice(0,10)}</span>
          </h2>
          <h2 className='h5 fw-bold d-flex'>
            Uploaded At : <span className='ms-2 text-main'>{Category?.updatedAt.slice(0,10)}</span>
          </h2>
          </div>
        </div>
      </div>
      <div className="row align-items-stretch g-3">
          {AllCategoryProducts.map((product, index) => (
            <ShowProducts product={product} index={index} key={product.id}  />
          ))}
        </div>
        </>
    :
    <Loading/>}
     </div>
    </>
}
