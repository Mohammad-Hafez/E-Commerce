import React from 'react'
import ApiBaseUrl from '../BaseUrl'
import Loading from '../Loading/Loading'
import { useEffect } from 'react'
import axios  from 'axios'
import { useState } from 'react'
import {Helmet} from "react-helmet";
import { Link } from 'react-router-dom'
  export default function Brands() {
    const [brands, setbrands] = useState([])
    async function getBrands() {
      let {data}= await axios.get(ApiBaseUrl + '/api/v1/brands')
      setbrands(data.data)
    }
    useEffect(()=>{
      getBrands();
    },[])
    return <>
      <Helmet>
        <title>Our Brands</title>
      </Helmet>
    <div className="container py-3">
      {brands.length !== 0 ?
      <div className="row text-center gy-4">
      {brands?.map((brand, index)=>
          <div key={index} className="col-lg-2 col-md-3 col-sm-4 col-4">
            <Link to={`/SelectedBrand/${brand._id}`}>
            <div className="brand rounded px-2 py-3 cursor-pointer">
            <img src={brand.image} alt="" className='w-100' loading="lazy"/>
           <h5 className='text-main'>{brand.name}</h5>
            </div>
            </Link>
          </div>
      )}
      </div>
      :
      <Loading/>
    }
    </div>
    </>
  }
