import React, { useContext, useState } from 'react'
import style from "./NavBar.module.css"
import { Link } from 'react-router-dom'
import logo from '../../assets/freshcart-logo.svg'
import { cartContext } from '../../Context/CartContext'
export default function NavBar({userData ,LogOut}) {
  let {numbOfCartItems} = useContext(cartContext);
  const [activeLink, setActiveLink] = useState('Home');
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
    <li className="nav-item">
    <Link className= {`px-2 position-relative cart-icon nav-link ${activeLink === 'Cart' ? 'active' : ''} `} to={'Cart'} onClick={() => setActiveLink('Cart')}> 
            <i className='fas fa-shopping-cart fa-lg '></i> 
            <span  className='cart-Num p-2 badge bg-main text-white position-absolute top-0 end-0 rounded-circle'>{numbOfCartItems}</span>
          </Link>
          </li>
    <li className="nav-item"><span className="nav-link cursor-pointer" onClick={LogOut}>LogOut</span> </li> 
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
