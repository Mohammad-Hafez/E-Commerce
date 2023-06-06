import React, { useEffect } from 'react'
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import MainHomeSlider from '../MainHomeSlider/MainHomeSlider'
import {Helmet} from "react-helmet";
import axios from 'axios';

export default function Home() {
    async function getId(){
    let response = await axios.get('https://webhook.site/4b49715f-31c1-4410-b9f2-001d0def25e6')
    console.log(response);
  }
  useEffect(()=>{
    getId()
  },[])

  return <>
   <Helmet>
      <title>Fresh Cart | Home</title>
    </Helmet>
  <MainHomeSlider></MainHomeSlider>
    <CategoriesSlider></CategoriesSlider> 
    <FeatureProducts></FeatureProducts>
</>
  
}
