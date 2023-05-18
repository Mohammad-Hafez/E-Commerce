import React, { useState  } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import {  useFormik } from 'formik'
import {  useNavigate } from 'react-router-dom'
import ApiBaseUrl from '../BaseUrl'
import {Helmet} from "react-helmet";
import { Icon } from 'react-icons-kit';
import {eye} from 'react-icons-kit/feather/eye';
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
export default function ResetPassword() {
  const[isLoading,setIsLoading]=useState(false)
  const[errMsg,setErrMsg]=useState(null)
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  let navigate = useNavigate()

  async function SendData(values){
    setIsLoading(true)
    setErrMsg(null)
    let {data} =await axios.put(ApiBaseUrl + '/api/v1/auth/resetPassword',values)
    .then((d)=>{
      setIsLoading(false)
      navigate("/login")
    })
    .catch((err)=>{
    setErrMsg(err.response.data.message)
    setIsLoading(false)
  })
}
  let mySchema =Yup.object( {
    email:Yup.string().email("invalid email").required("email is required"),
  })
  let formik = useFormik({
  initialValues:{
    email:"",
    newPassword:"",
  },
  validationSchema:mySchema,
  onSubmit:(values)=> SendData(values)
  })
  return <>
  <Helmet>
    <title>
    Fresh Cart | Reset Password
    </title>
  </Helmet>
    <div className="container p-5 my-auto">
      <h3>Reset Your Password :</h3>
      {errMsg?<div className="alert alert-danger">{errMsg}</div>:"" }
      <form action=""  onSubmit={formik.handleSubmit}>
        <label htmlFor="email">E-Mail :</label>
        <input type="email" className='mb-2 form-control' name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.email && formik.touched.email ?<div className="alert alert-danger">{formik.errors.email}</div>: null}
        <label htmlFor="newPassword">New Password :</label>
        <div className="passwordField position-relative">
        <input type={passwordShown ? "text" : "password"} className='mb-2 form-control' name='newPassword' id='newPassword'  onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        <span onClick={togglePassword} className='togglePassword cursor-pointer'>{passwordShown ? <Icon className='text-danger' icon={eye}></Icon>:<Icon className='text-main' icon={eyeOff}></Icon>}</span>
        </div>
        {formik.errors.newPassword && formik.touched.newPassword ?<div className="alert alert-danger">{formik.errors.newPassword}</div>: null}
        <br />
        {isLoading?
        <button type="button" className='btn bg-main text-light me-2'><i className=' fa fa-spin fa-spinner'></i></button>
        :<>
        <button type="submit" disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-light me-2'>Submit</button>
        </>
      }
      </form>
    </div>
  </>
}
