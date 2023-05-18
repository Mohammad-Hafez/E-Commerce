import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
export default function Layout({userData , setUserData}) {
  let navigate = useNavigate();
  function LogOut(){
    localStorage.removeItem("UserToken")
    setUserData(null)
    navigate("/login")
  }
  return (
    <>
    <div className="layOut">
    <NavBar userData ={userData} LogOut={LogOut}/>
    <Outlet/>
    <Footer/>
    </div>
    </>
  )
}
