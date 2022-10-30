import {React,createContext, useState,useEffect} from 'react';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';
//import SHOP_DATA from '../shop-data';


export const CategoriesContext = createContext({

    categoriesMAp: {},

});


export const CategoriesProvider =({children}) =>{

    const [categoriesMap,setcategoriesMAp] = useState({});

    useEffect(()=>{

        const getCategoriesMap = async () =>{
            
            const categoryMap = await getCategoriesAndDocuments();
       
            setcategoriesMAp(categoryMap)
        }
        
        getCategoriesMap();
    },[])

    const value = {categoriesMap}
    return(
        <CategoriesContext.Provider value={value}> {children} </CategoriesContext.Provider>
    )
}
