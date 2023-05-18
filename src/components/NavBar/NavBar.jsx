import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/freshcart-logo.svg'
import { cartContext } from '../../Context/CartContext'
export default function NavBar({userData ,LogOut}) {
  let {numbOfCartItems} = useContext(cartContext);
  const [activeLink, setActiveLink] = useState('Home');
  useEffect(()=>{
    if (userData) {
      setActiveLink('Home')
    }else{
      setActiveLink('Login')
    }
  },[userData])
  return <>
    <nav className={ `first-z navbar navbar-expand-lg bg-light navbar-light position-sticky top-0`}>
  <div className="container ">
    <Link className="navbar-brand" to={""}>
      <img src={logo} alt="Logo" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="navbar-collapse collapse justify-content-between" id="navbarSupportedContent">
    {userData &&
    <>
      <ul className="navbar-nav mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${activeLink === 'Home' ? ' active' : ''}`} to={""} onClick={() => setActiveLink('Home')}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${activeLink === 'Categories' ? ' active' : ''}`} to={'Categories'} onClick={() => setActiveLink('Categories')}>
            Categories
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${activeLink === 'Brands' ? ' active' : ''}`}to={'Brands'} onClick={() => setActiveLink('Brands')}>
            Brands
          </Link>
        </li>
      </ul>
      <ul className='navbar-nav navIcon nav-item'>
            <i className="fa-brands fa-facebook-f mx-1 cursor-pointer nav-link"></i>
            <i className="fa-brands fa-instagram mx-1 cursor-pointer nav-link"></i>
            <i className="fa-brands fa-twitter mx-1 cursor-pointer nav-link"></i>
      </ul>
    </> 
}
<ul className='navbar-nav'>
  {userData ? <>
  <div className="nav-left d-flex align-items-center justify-content-start">
    <li className="nav-item m-0 p-0">
      <Link  className= {`position-relative cart-icon nav-link mx-1   ${activeLink === 'Cart' ? 'active' : ''}`} to={'Cart'} onClick={() => setActiveLink('Cart')}>
        <div className="cartContainer rounded-circle ">
        <i className='fas fa-shopping-cart text-light'></i> 
        </div> 
        <span  className='cart-Num p- badge bg-main text-white position-absolute top-0 end-0 rounded-circle'>{numbOfCartItems}</span>
      </Link>
    </li>
    <li className="nav-item m-0 p-0">
      <Link  className= {`position-relative fav-icon nav-link mx-1   ${activeLink === 'fav' ? 'active' : ''}`} to={'fav'} onClick={() => setActiveLink('fav')}>
        <div className="favContainer rounded-circle ">
        <i className='fas fa-heart text-light'></i> 
        </div> 
        <span  className='fav-Num p- badge bg-main text-white position-absolute top-0 end-0 rounded-circle'>0</span>
      </Link>
    </li>

    <li className="nav-item"><span className="nav-link cursor-pointer" onClick={()=>{
      LogOut()
      setActiveLink('Login')
      }}>
      LogOut
      </span>
      </li> 
    </div>
    </>
  :
    <>
    
      <li className="nav-item">
        <Link className={`nav-link ${activeLink === 'Login' ? ' active' : ''}`} to={"Login"} onClick={() => setActiveLink('Login')}>Login</Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${activeLink === 'Signup' ? ' active' : ''}`} to={"Signup"} onClick={() => setActiveLink('Signup')}>Signup</Link>
      </li>
    </>
  }
      </ul>
    </div>
  </div>
  </nav>
  </>
}
