import React from 'react'
import styles from "./ProtectedRoutes.module.css"
import { Navigate } from 'react-router-dom'
export default function ProtectedRoutes(props) {
  if (localStorage.getItem("UserToken")) {
    // navigate to entered path
    return props.children
  }else{
    // navigate to login
    return <Navigate to={"/login"}></Navigate>
  }
}
