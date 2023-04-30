import React, { useContext , useEffect , useState } from 'react'
import styles from "./CategoriesSlider.module.css"
import Slider from "react-slick";
import Loading from '../Loading/Loading'
import { Link, useNavigate } from 'react-router-dom'
import { CategoriesContext } from '../../Context/CategoriesContext'
export default function CategoriesSlider() {
  let {getCategories} = useContext(CategoriesContext)
  const [CategoriesSlider ,setCategoriesSlider ] = useState([])
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
  };
  async function getCategoriesSlider(){
      let response = await getCategories()
      setCategoriesSlider(response.data.data)
  }
  useEffect(()=>{getCategoriesSlider()},[])
  return <>
    { CategoriesSlider.length != 0 ?
    <div className="container">
    <Slider {...settings}>
      {CategoriesSlider.map((category)=> <div key={category._id} id='categorySliderItem' className ={`${styles.catContainer} cursor-pointer`}>
        <img className={`${styles.imgSize}`} src={category.image} alt="category Image" />
        <h3 className='h6'>{category.name}</h3>
      </div>)}
    </Slider>  

    </div>
    :
    <Loading/>
    }
    </>
}
