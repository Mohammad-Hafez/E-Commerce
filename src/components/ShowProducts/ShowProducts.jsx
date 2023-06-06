import React, { useContext , useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { cartContext } from '../../Context/CartContext';
import { favContext } from '../../Context/wishListContext';

export default function ShowProducts({product , index}) {
    const [cartButtonLoading, setcartButtonLoading] = useState([]);
    const [favButtonLoading, setFavButtonLoading] = useState([]);
    let { addToCart, setNumbOfCartItems } = useContext(cartContext);
    let { addToFavList } = useContext(favContext);

    async function addProductToCart(productId, index) {
        let newCartButtonLoading = [...cartButtonLoading];
        newCartButtonLoading[index] = true;
        setcartButtonLoading(newCartButtonLoading);
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
        setcartButtonLoading(!newCartButtonLoading);
      }
      async function addProductToFav(productId, index) {
        let newFaButtonLoading = [...favButtonLoading];
        newFaButtonLoading[index] = true;
        setFavButtonLoading(newFaButtonLoading);
        try {
          let response = await addToFavList(productId);
          if (response?.data?.status == 'success') {
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
        setFavButtonLoading( !newFaButtonLoading);
      }

  return <>
              <div className="col-lg-2 col-md-3 col-sm-4 col-6">
              <div className="product rounded h-100 px-2 py-3 d-flex flex-column justify-content-between">
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
                  <div className="row m-0">
                    <div className="col-8 p-1">
                    {cartButtonLoading[index] ? (
                  <button className="btn bg-main text-white w-100" disabled>
                    <i className="fa fa-spin fa-spinner"></i>
                  </button>
                    ) : (
                    <button onClick={() => addProductToCart(product._id, index)} className="btn bg-main text-center text-white w-100">
                    + Add
                  </button>
                  )}
                    </div>
                    <div className="col-4  p-1">
                      {favButtonLoading[index] ? <>
                  <button className="btn bg-danger text-white w-100" disabled>
                    <i className="fa fa-spin fa-spinner"></i>
                  </button>
                      </> :
                        <button onClick={() => addProductToFav(product._id, index)} className='btn btn-danger w-100 d-flex justify-content-center h-100 align-items-center'><i className='fas fa-heart text-light fa-lg'></i></button>
                      }
                    </div>
                  </div>
                
                
              </div>
            </div>
  </>
}
