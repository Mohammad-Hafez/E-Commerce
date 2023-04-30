
import React, { useState } from 'react'
import styles from "./Login.module.css"
import * as Yup from 'yup'
import axios from 'axios'
import { Formik, useFormik, validateYupSchema } from 'formik'
import { useNavigate } from 'react-router-dom'
import ApiBaseUrl from '../BaseUrl'
import {Helmet} from "react-helmet";
export default function Login({saveUser}) {
  const[isLoading,setIsLoading]=useState(false)
  const[errMsg,setErrMsg]=useState(null)
  let navigate = useNavigate()
  async function Login(values){
    setIsLoading(true)
    setErrMsg(null)
    let {data} =await axios.post(ApiBaseUrl + '/api/v1/auth/signin',values).catch((err)=>{
    setErrMsg(err.response.data.message)
    setIsLoading(false)
  })
    if (data.message == "success") {
      setIsLoading(false)
      localStorage.setItem("UserToken",data.token)
      saveUser()
      navigate("/")
    }
  }
  let mySchema =Yup.object( {
    email:Yup.string().email("invalid email").required("email is required"),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"invalid password").required("password is required"),
  })
 let formik = useFormik({
  initialValues:{
    email:"",
    password:"",
  },
  validationSchema:mySchema,
  onSubmit:(values)=> Login(values)
 })
  return <>
    <div className="container login p-5  my-auto">
      <h3>LOG IN :</h3>
      {errMsg?<div className="alert alert-danger">{errMsg}</div>:"" }
      <form action=""  onSubmit={formik.handleSubmit}>
        <label htmlFor="email">email :</label>
        <input type="email" className='mb-2 form-control' name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.email && formik.touched.email ?<div className="alert alert-danger">{formik.errors.email}</div>: null}
        <label htmlFor="password">password :</label>
        <input type="password" className='mb-2 form-control' name='password' id='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.password && formik.touched.password ?<div className="alert alert-danger">{formik.errors.password}</div>: null}
        {isLoading?
        <button className='btn btn-success'><i className=' fa fa-spin fa-spinner'></i></button>
        :
        <button disabled={!(formik.isValid && formik.dirty)} className='btn btn-success me-2'>Log in</button>
      }
      </form>
    </div>
  </>
}
