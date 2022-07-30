import React from 'react';
import './categories.styles.scss'
import CategoryItem from '../category-item/category-item.components'



const CategoryMenuComponents = ({categories}) => {
    return (
        <div>

            <div className='categories-container'>
                {categories.map((category) =>{
                return <CategoryItem key={category.id} category ={category} />
                
                })}
            </div>
                        
        </div>
    );
}

export default CategoryMenuComponents;
