import React, { useContext , useEffect , useState } from 'react'
import {Helmet} from "react-helmet";
import { favContext } from '../../Context/wishListContext'
import Loading from '../Loading/Loading'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

export default function Fav() {
  const {getLoggedUserFavList , removeFavItem} = useContext(favContext)
  const [FavListDetails, setFavListDetails] = useState()
  async function getFavListDetails (){
    let response = await getLoggedUserFavList()
    console.log(response.data.data);
    if (response?.data?.status === 'success') {
      setFavListDetails(response.data.data);
    }else{
      setFavListDetails(response.message)
    }
  }
  async function deleteItem(productId){
    let response = await removeFavItem(productId)
    setFavListDetails(response.data.data);
    toast.success('Product Removed' , {
      className : 'first-z mt-5 bg-main-light text-danger ',
      duration:2000})
    getFavListDetails()
  }
    useEffect(()=>{
    getFavListDetails()
  },[])
  return <>
    <Helmet>
      <title>Fresh Cart | WishList</title>
    </Helmet>
    <section id='favList'>
    <div className="container bg-main-light my-4 p-4 position-relative rounded shadow-sm">
      <h3>Your WishList :</h3>
      {FavListDetails?.map((product)=> <div key={product.id} className="row border-bottom py-2 my-2 align-items-center">
          <div className="col-3 col-md-2 col-lg-1">
            <div className="favPrImgContainer">
              <img src={product.imageCover} className='img-fluid' alt={product.slug} />
            </div>
        </div>
        <div className="col-9 col-md-10 col-lg-11 ">
        <div className="cartProductContainer d-flex justify-content-between align-items-center flex-wrap">
          <div className='productDetails'>
          <h6>{product.title}</h6>
          <h6 className='text-main'>price : {product.price} EGP</h6>
          </div>
          <button onClick={()=>{deleteItem(product.id)}} className='btn m-0 p-0'><i className='fa-regular fa-trash-can text-danger'></i> Remove Item </button>
        </div>
      </div>

      </div> )}
    </div>
    </section>
    </>
}
