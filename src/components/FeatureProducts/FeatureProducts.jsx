import React, { useContext } from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
import ApiBaseUrl from '../BaseUrl';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';

export default function FeatureProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [buttonLoading, setButtonLoading] = useState([]);
  let { addToCart, setNumbOfCartItems } = useContext(cartContext);

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
    }catch (error) {
      toast.error('An Error Occurred', {
        className: 'first-z mt-5 bg-main-light ',
        duration: 2000,
      });
    }
      newButtonLoading[index] = false;
      setButtonLoading(newButtonLoading);
  }
  async function getProducts() {
    let { data } = await Axios.get(ApiBaseUrl + '/api/v1/products');
    setAllProducts(data.data);
    setButtonLoading(new Array(data.data.length).fill(false));
  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <div className="container my-5 ">
        <div className="row">
          {allProducts.map((product, index) => (
            <div key={product.id} className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
              <div className="product rounded px-2 py-3">
                <Link to={`/product-details/${product.id}`}>
                  <img src={product.imageCover} className="w-100 rounded" alt={product.slug} loading="lazy" />
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
                  <div className="row">
                    <div className="col-8">
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
                    <div className="col-4">
                    <button className='btn btn-danger w-100 text-center'><i className='fas fa-heart text-light fa-lg'></i></button>
                    </div>
                  </div>
                
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}