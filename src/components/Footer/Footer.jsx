import React from 'react'
import styles from "./Footer.module.css"
import { useEffect } from 'react'
export default function Footer() {
  useEffect(()=>{
    let footer = document.getElementById("footer")
    console.log(footer.style.bottom);
    if (footer.style.bottom > 0) {
      footer.style.bottom = 0;
    }
  },[])
  return <>
    <footer className='py-4 text-dark bg-main-light text-center' id='footer'>
      <div className="container">
        <h2>
          Get The Fresh Cart App
        </h2>
        <p className='text-muted'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, eligendi.</p>
        <form action="">
          <div className="row g-4">
            <div className="col-md-8">
              <input type="text" placeholder='E-mail' className='form-control' />
            </div>
            <div className="col-md-4">
              <button className='btn bg-main text-white'>Share App Link</button>
            </div>
          </div>
        </form>
      </div>
    </footer>
  </>
}
