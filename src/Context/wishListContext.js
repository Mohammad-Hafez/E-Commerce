import axios from "axios";
import { createContext, useEffect, useState } from "react";
import ApiBaseUrl from "../components/BaseUrl";
export const favContext = createContext()
export default function FavContextProvider(props) {
    const [FavId, setFavId] = useState(null)
    let headers = {
        token:localStorage.getItem("UserToken")
    }
    function getLoggedUserFavList(){
        return axios.get(ApiBaseUrl + `/api/v1/wishlist` ,
        {
            headers
        }
        ).then((response) => response)
        .catch((erorr) => erorr)
    }
    async function getFavList(){
        let response = await getLoggedUserFavList()
        if (response?.data?.status === 'success') {
            setFavId(response.data.data._id)
        }
    }
    useEffect(()=>{
        getFavList();
    },[])
    function addToFavList(productId){
        return axios.post(ApiBaseUrl + `/api/v1/wishlist` ,
        {
            productId
        },
        {
            headers
        }
        ).then((response) => response)
        .catch((erorr) => erorr)
    }
    function removeFavItem(productId){
        return axios.delete(ApiBaseUrl + `/api/v1/wishlist/${productId}` , 
        {
            headers
        })
        .then((response)=>response)
        .catch((erorr)=>erorr)
    }
return <>
    <favContext.Provider value={{getLoggedUserFavList , addToFavList , removeFavItem}}>
        {props.children}
    </favContext.Provider>
</>
}
