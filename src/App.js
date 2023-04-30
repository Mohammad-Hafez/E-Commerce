import './App.css';
import { Offline, Online } from "react-detect-offline";
import Home from './components/Home/Home'
import Brands from './components/Brands/Brands'
import AllCategories from './components/Categories/Categories'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Layout from './components/Layout/Layout'
import SlectedBrand from './components/SlectedBrand/SlectedBrand'
import SelectedCategory from './components/SelectedCategory/SelectedCategory'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useState } from 'react';
import { useEffect } from 'react';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import { CartContextProvider } from './Context/CartContext';
import { CategoriesContextProvider } from './Context/CategoriesContext';
import toast, { Toaster } from 'react-hot-toast';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import Notfound from './components/Notfound/Notfound';
function App() {
  const[userData,setUserData]=useState(null)
  useEffect(()=>{
    if (localStorage.getItem("UserToken")) {
      saveUser()
    }
  },[])
  function saveUser(){
    let encodedToken = localStorage.getItem("UserToken")
    let decodedToken = jwtDecode(encodedToken)
    setUserData(decodedToken)
  }
  const routes = createHashRouter([
    {
      path: "",element:<Layout userData={userData} setUserData={setUserData}/>,
      children:[
        {index:true , element:<ProtectedRoutes><Home/></ProtectedRoutes> },
        {path : "home",element:<ProtectedRoutes><Home/></ProtectedRoutes>},
        {path : "Cart",element:<ProtectedRoutes><Cart/></ProtectedRoutes>},
        {path : "Categories",element:<ProtectedRoutes><AllCategories/></ProtectedRoutes>},
        {path : "SelectedBrand/:id",element:<ProtectedRoutes><SlectedBrand/></ProtectedRoutes>},
        {path : "Brands",element:<ProtectedRoutes><Brands/></ProtectedRoutes>},
        {path : "SelectedCategory/:id",element:<ProtectedRoutes><SelectedCategory/></ProtectedRoutes>},
        {path : "checkout",element:<ProtectedRoutes><Checkout/></ProtectedRoutes>},
        {path : "product-details/:id",element:<ProtectedRoutes><ProductDetails/></ProtectedRoutes>},
        {path : "login",element: <Login saveUser={saveUser}/>},
        {path : "signup",element:<Signup/>},
        {path : "*",element:<Notfound/>}
      ]
    }
  ])
  return <>
    <CartContextProvider>
    <CategoriesContextProvider>
      <Toaster/>
      <Offline> <div className='network p-3 bg-danger text-light rounded align-items-center d-flex'><i className="fa-solid fa-triangle-exclamation me-2"></i>Faild Network Conection</div> </Offline>
      <RouterProvider router={routes}></RouterProvider>
    </CategoriesContextProvider>
    </CartContextProvider>
    </>
  ;
}

export default App;
