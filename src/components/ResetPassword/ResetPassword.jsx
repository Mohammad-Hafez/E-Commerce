import React , { useState , useEffect } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { Formik, useFormik, validateYupSchema } from 'formik'
import { Link , useNavigate, useParams  } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import ApiBaseUrl from '../BaseUrl'
import {Helmet} from "react-helmet";
export default function ResetPassword() {
  const navigate = useNavigate()
  const [ErrMsg, setErrMsg] = useState(null)
  const [countdown, setCountdown] = useState(600); // 10 minutes in seconds
    // rest of the component code
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;


  const[isLoading,setIsLoading]=useState(false)
  let mySchema =Yup.object( {
    resetCode:Yup.string()
    .matches(/^\S*$/, 'No spaces allowed')
    .required('This field is required'),
  })


  async function ResetPasswordCode(values){
    setIsLoading(true)
    let {data} = await axios.post(ApiBaseUrl + '/api/v1/auth/verifyResetCode' , values)
    .catch((err)=>{
      setErrMsg(err.response.data.message)
      setIsLoading(false)
      toast.error("Code Dos'nt Exist" ,{
        className : 'first-z mt-5 bg-main-light',
        duration:2000
      })
      console.log(err );
    })


    .then(()=>{
      setErrMsg(null)
      setIsLoading(false)
      toast.success("Your Email Verified Successfully",{
        className : 'first-z mt-5 bg-main-light',
        duration:2000
      })
  })

  }
  function calaTime() {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);
    if (countdown <= 0) {
      clearInterval(timer);
      navigate('/login');
    }
    return () => {
      clearInterval(timer);
    }
  }
  useEffect(() => {
    
    return calaTime()
  }, [countdown]);

  let formik = useFormik({
  initialValues:{
    resetCode:"",
  },
  validationSchema:mySchema,
  onSubmit:(values)=> {
    ResetPasswordCode(values)
  }
  })
  return <>
    <Helmet>
      <title>Forget Password</title>
    </Helmet>
    <div className="container login p-5  my-auto">
      <form action="" onSubmit={formik.handleSubmit}>
        <label htmlFor="resetCode"><h3>Enter Reset Code :</h3></label>
         <span className='mx-1 text-muted'>Your Password Reset Code Valid For {minutes} m : {seconds < 10 ? `0${seconds}` : seconds} s</span>
        <input placeholder='######' type="text" className='mb-2 form-control' name='resetCode' id='resetCode' value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.resetCode && formik.touched.resetCode ?<div className="alert alert-danger">{formik.errors.resetCode}</div>: null}
        {ErrMsg?<>
        <div className="alert alert-danger">{ErrMsg}</div>
        <button className='btn btn-secondary me-2'>Resend Code</button>
        </>
        : null }
        {isLoading?
        <button className='btn bg-main text-light me-2'><i className=' fa fa-spin fa-spinner'></i></button>
        :<>
        <button type="submit" onClick={()=>{ResetPasswordCode()}} disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-light me-2'>Reset Password</button>
        </>
      }
      </form>
    </div>

    </>
}
