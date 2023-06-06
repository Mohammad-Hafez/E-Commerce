import React, { useEffect , useState } from 'react';
import ApiBaseUrl from '../BaseUrl'
import { useParams } from 'react-router-dom'
import Axios  from 'axios'
import {Helmet} from "react-helmet";
import Loading from '../Loading/Loading'
import ShowProducts from '../ShowProducts/ShowProducts';
export default function SlectedBrand() {
  const [AllBrands, setAllBrands] = useState()
  const [BrandProducts, setBrandProducts] = useState([])
  let {id} = useParams()
  async function getBrand() {
    let {data} = await Axios.get(ApiBaseUrl + `/api/v1/brands/${id}`);
    setAllBrands(data.data)
  }
  async function getProducts() {
    let {data} = await Axios.get(ApiBaseUrl + '/api/v1/products');
    setBrandProducts(data?.data);
    let filteredProducts = data?.data?.filter(product => product.brand._id === id);
    setBrandProducts(filteredProducts);
  }
  useEffect(()=>{
    getBrand()
    getProducts()
  },[])
  return <>
    <Helmet>
      <title>Brand</title>
    </Helmet>
    {AllBrands && BrandProducts? 
    <div className="container mb-2">
      <div className="row align-items-center text-center bg-main-light rounded mb-3 mt-2">
        <div className="col-md-6 p-2">
        <img src={AllBrands?.image} className='w-100 rounded brandImg' alt="" />
        </div>
        <div className="col-md-6 px-3">
          <div className="brandDetails">
          <h2 className='h5 fw-bold w-100'>
            Brand Name: <span className=' ms-2 text-main'>{AllBrands?.name}</span>
          </h2>
          <h2 className='h5 fw-bold w-100'>
          Created At : <span className='ms-2 text-main'>{AllBrands?.createdAt.slice(0,10)}</span>
          </h2>
          <h2 className='h5 fw-bold'>
            Uploaded At : <span className='ms-2 text-main'>{AllBrands?.updatedAt.slice(0,10)}</span>
          </h2>
          </div>
        </div>
      </div>
      <div className="row">
          {BrandProducts.map((product, index) => (
              <ShowProducts product={product} index={index} key={product.id} />
          ))}
        </div>
    </div>
    :
    <Loading/>}
    </>
}
