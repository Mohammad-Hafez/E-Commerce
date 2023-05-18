import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { cartContext } from '../../Context/CartContext'
import Loading from '../Loading/Loading'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import {Helmet} from "react-helmet";
export default function Cart() {
  let {getLoggedUserCart , removeItem , updateProductCount , clearUserCart , setNumbOfCartItems} = useContext(cartContext)
  const [cartDetails, setCartDetails] = useState(null)
  const [btnLoading, setBtnLoading] = useState(false)
  let navigate = useNavigate()
  async function getCart (){
    let response = await getLoggedUserCart()
    if (response?.data?.status === 'success') {
      setCartDetails(response.data.data);
    }else{
      setCartDetails(response.message)
    }
  }
  async function deleteItem(productId){
    setBtnLoading(true)
    let response = await removeItem(productId)
    setCartDetails(response.data.data);
    setNumbOfCartItems(response.data.numOfCartItems)
    toast.success('Product Removed' , {
      className : 'first-z mt-5 bg-main-light text-danger ',
      duration:2000})
      setBtnLoading(false)
  }
  async function deleteCart(){
    setBtnLoading(true)
    let response = await clearUserCart()
    setCartDetails(response.data.data);
    toast.success('Cart Is Empty' , {
      className : 'first-z mt-5 bg-main-light text-danger ',
      duration:2000})
      setNumbOfCartItems("0")
      setBtnLoading(false)
      navigate("/")
  }
  
  async function updateProductQuantity(productId , count){
    setBtnLoading(true)
    let response = await updateProductCount(productId , count)
    if (count <= 0) {
      deleteItem(productId)
    }
    setCartDetails(response.data.data);
    toast.success('Product Count Updated' , {
      className : 'first-z mt-5 bg-main-light text-main ',
      duration:2000})
      setBtnLoading(false)
  }

  useEffect(()=>{
    getCart()
  },[])
  return <>
  <Helmet>
      <title>Cart Details</title>
    </Helmet>
  {cartDetails? 
    <div className="container bg-main-light my-4 p-4 position-relative">
        {btnLoading ?
        <div className="overlayLoading">
          <i className='text-main fa fa-spin fa-spinner fs-1'></i>
        </div>
          : null}
      <h3>Shop Cart :</h3> 
      {cartDetails?.products? <>
      <h6 className='text-main'>Total Cart Price : {cartDetails.totalCartPrice} EGP</h6>
      <button onClick={deleteCart} className=' btn btn-danger btn-sm mb-3'> Clear All Items </button>
      </>
      :
      <h3 className='text-main h6'>Your Cart IS Empty</h3>
      }
      {cartDetails.products?.map((product)=> <div key={product.product._id} className='row border-bottom py-2 my-2 align-items-center'>
      <div className="col-md-1">
        <img src={product.product.imageCover} className='w-100' alt="" />
      </div>
      <div className="col-md-11 d-flex justify-content-between align-items-center">
        <div>
        <h6>{product.product.title}</h6>
        <h6 className='text-main'>price : {product.price} EGP</h6>
        <button onClick={()=>{deleteItem(product.product._id)}} className='btn m-0 p-0'><i className='fa-regular fa-trash-can text-danger'></i> Remove Item </button>
        </div>
        <div>
          <button onClick={()=>{updateProductQuantity(product.product._id , product.count+1)}} className='btn border-main btn-sm'>+</button>
          <span className='mx-2'>{product.count}</span>
          <button onClick={()=>{updateProductQuantity(product.product._id , product.count-1)}} className='btn border-main btn-sm'>-</button>
        </div>
      </div>
      </div>)}
      {cartDetails.products? <button className='btn bg-main btn-sm d-block'>
        <Link className='text-light' to={'/checkout'}>
          Checkout
        </Link>
      </button>:null }
    </div>
  :
  <Loading/>}
  </>
}
