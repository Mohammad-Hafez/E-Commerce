import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import slide1 from '../../assets/images/slider-image-1.jpeg'
import slide2 from '../../assets/images/slider-image-2.jpeg'
import slide3 from '../../assets/images/slider-image-3.jpeg'
export default function MainHomeSlider() {
  return <>
  <div className="container">
  <div className="row g-0">
      <div className="col-8">
        <div className="mainImgConrainer">
          <OwlCarousel className='owl-theme' items={1} loop >
          <img src={slide1} height={300} className='w-100 object-fit-contain ' alt="" />
          <img src={slide2} height={300} className='w-100 object-fit-contain' alt="" />
          <img src={slide3} height={300} className='w-100 object-fit-contain' alt="" />
          </OwlCarousel>
        </div>
      </div>
      <div className="col-4">
        <img src={slide2} className='w-100 object-fit-contain' height={150} alt="" />
        <img src={slide3} className='w-100 object-fit-contain' height={150} alt="" />
      </div>
    </div>

  </div>
  </>
}
