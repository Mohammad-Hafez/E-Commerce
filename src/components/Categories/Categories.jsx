import React, { useContext , useEffect , useState } from 'react'
import Loading from '../Loading/Loading'
import {Helmet} from "react-helmet";
import { Link , useNavigate} from 'react-router-dom'
import { CategoriesContext } from '../../Context/CategoriesContext'
export default function AllCategories(){
    let {getCategories} = useContext(CategoriesContext)
    const [Categories, setCategories] = useState([])
    async function getAllCategories(){
        let response = await getCategories()
        setCategories(response.data.data)
    }  
    useEffect(()=>{getAllCategories()},[])
    return <>
     <Helmet>
        <title>Our Categories</title>
      </Helmet>
    <div className="container py-3">
    {Categories.length !==0 ?
        <div className="row text-center gy-4">
            {Categories?.map((category , index) => 
                <div key={index} className="col-lg-2 col-md-3 col-4">
                    <div className="category rounded px-2 py-3 cursor-pointer">
                    <Link to={`/SelectedCategory/${category._id}`}>
                    <img className='w-100 rounded' height={150} src={category.image} alt="category Image" loading="lazy" />
                    <h5 className='text-main'>{category.name}</h5>
                    </Link>
                    </div>
                </div>)}
        </div>
        :
        <Loading/>
    }
    </div>
    </>
}