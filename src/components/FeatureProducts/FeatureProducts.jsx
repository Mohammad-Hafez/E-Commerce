import React, { useEffect , useState } from 'react';
import Axios from 'axios';
import ApiBaseUrl from '../BaseUrl';
import ShowProducts from '../ShowProducts/ShowProducts';

export default function FeatureProducts() {
  const [allProducts, setAllProducts] = useState([]);
  async function getProducts() {
    let { data } = await Axios.get(ApiBaseUrl + '/api/v1/products');
    setAllProducts(data.data);
  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <div className="container my-5 ">
        <div className="row align-items-stretch g-3">
          {allProducts.map((product, index) => (
            <ShowProducts product={product} index={index} key={product.id} />
          ))}
        </div>
      </div>
    </>
  );
}