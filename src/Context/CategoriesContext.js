import axios from "axios";
import { createContext, useEffect, useState } from "react";
import ApiBaseUrl from "../components/BaseUrl";
export let CategoriesContext = createContext();
export function CategoriesContextProvider(props){
    async function getCategories(){
        return axios.get(ApiBaseUrl + "/api/v1/Categories")
        .then((response)=> response)
        .catch((erorr)=> erorr)
    }
    // async function getCategory(){
    //     return axios.
    // }
    return <>
    <CategoriesContext.Provider value={{getCategories}}>
        {props.children}
    </CategoriesContext.Provider>
    </>
}