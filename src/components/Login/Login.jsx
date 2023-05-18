import React, { useState , useEffect } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { Formik, useFormik, validateYupSchema } from 'formik'
import { Link , useNavigate, useParams } from 'react-router-dom'
import ApiBaseUrl from '../BaseUrl'
import {Helmet} from "react-helmet";
import { Icon } from 'react-icons-kit';
import {eye} from 'react-icons-kit/feather/eye';
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
export default function Login({saveUser}) {
  const[isLoading,setIsLoading]=useState(false)
  const[errMsg,setErrMsg]=useState(null)
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
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
  <Helmet>
    <title>
    Fresh Cart | Login
    </title>
  </Helmet>
    <div className="container login p-5  my-auto">
      <h3>LOG IN :</h3>
      {errMsg?<div className="alert alert-danger">{errMsg}</div>:"" }
      <form action=""  onSubmit={formik.handleSubmit}>
        <label htmlFor="email">E-Mail :</label>
        <input type="email" className='mb-2 form-control' name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.email && formik.touched.email ?<div className="alert alert-danger">{formik.errors.email}</div>: null}
        <label htmlFor="password">Password :</label>
        <div className="passwordField position-relative">
        <input type={passwordShown ? "text" : "password"} className='mb-2 form-control' name='password' id='password'  onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        <span onClick={togglePassword} className='togglePassword cursor-pointer'>{passwordShown ? <Icon className='text-danger' icon={eye}></Icon>:<Icon className='text-main' icon={eyeOff}></Icon>}</span>
        </div>
        {formik.errors.password && formik.touched.password ?<div className="alert alert-danger">{formik.errors.password}</div>: null}
        <Link to={'/forgetPassword'} id='forgetPass' className="btn p-0 mb-2 text-main">Do You Forget Your Password ? </Link>
        <br />
        {isLoading?
        <button className='btn btn-success me-2'><i className=' fa fa-spin fa-spinner'></i></button>
        :<>
        <button disabled={!(formik.isValid && formik.dirty)} className='btn btn-success me-2'>Log in</button>
        </>
      }
      </form>
    </div>
  </>
}
