import React from 'react';
import { useContext,Fragment } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';


import CategoryPreview from "../../components/categoruy-preview/category-preview.component.jsx"
const CetegoriesPreview = () => {

    const { categoriesMap } = useContext(CategoriesContext);
    return (
        <Fragment>

            {
                Object.keys(categoriesMap).map(title => {
                    const products = categoriesMap[title];
                     return(
                       <CategoryPreview key={title} title={title} products = {products} />
                    )
                })
            }



        </Fragment>

    );
}

export default CetegoriesPreview;
