import React from 'react'
import styles from "./Home.module.css"
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import MainHomeSlider from '../MainHomeSlider/MainHomeSlider'
import {Helmet} from "react-helmet";
export default function Home() {
  return <>
   <Helmet>
      <title>Fresh Cart | Home</title>
    </Helmet>
  <MainHomeSlider></MainHomeSlider>
    <CategoriesSlider></CategoriesSlider> 
    <FeatureProducts></FeatureProducts>
</>
  
}
