import React , { useState , useEffect } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import {  useFormik } from 'formik'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import ApiBaseUrl from '../BaseUrl'
import {Helmet} from "react-helmet";
export default function ForgetPassword() {
  const[isLoading,setIsLoading]=useState(false)
  const [Data, setData] = useState(false)
  let mySchema =Yup.object( {
    email:Yup.string().email("invalid email").required("email is required"),
  })
  async function sendCode(values){
    setIsLoading(true)
    let {data} = await axios.post(ApiBaseUrl + '/api/v1/auth/forgotPasswords' , values)
    if (data.statusMsg == 'success') {
      toast.success(data.message ,{
        className : 'first-z mt-5 bg-main-light',
        duration:2000})
        setData(true)
    }else{
      setData(false)
      toast.error(data.message ,{
        className : 'first-z mt-5 bg-main-light text-danger',
        duration:2000})
    }
    setIsLoading(false)
  } 
  let formik = useFormik({
  initialValues:{
    email:"",
  },
  validationSchema:mySchema,
  onSubmit:(values)=> sendCode(values)
  })
  return <>
    <Helmet>
      <title>Forget Password</title>
    </Helmet>
    <div className="container login p-5  my-auto">
      <form action=""  onSubmit={formik.handleSubmit}>
        <label htmlFor="email"> <h3>Enter Your Recover E-mail :</h3></label>
        <input type="email" className='mb-2 form-control' name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {isLoading?
        <button className='btn bg-main text-light me-2'><i className=' fa fa-spin fa-spinner'></i></button>
        :<>
        <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-light me-2'>Reset Password</button>
        </>
      }
      </form>
      {Data? <Navigate to="/ResetPasswordCode"  replace={true}/>:null}
    </div>
    </>
}
