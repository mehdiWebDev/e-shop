import {React,useContext,useState} from 'react';
import {CategoriesContext} from '../../contexts/categories.context';
import './product-card.styles.scss';
import Button,{buttonTypeClasses} from '../button/Button.component';

import { CartContext } from '../../contexts/cart.context';

const ProductCard = ({product}) => {

    const { addItemTocart } = useContext(CartContext);


    const addProductToCart = () => addItemTocart(product)
  
    const {name,price,imageUrl}= product;
    const cards = useContext(CategoriesContext)
    return (
        <div className='product-card-container' >

            <img src={imageUrl} alt={name}/>
            <div className="footer">
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType={buttonTypeClasses.inverted} onClick={addProductToCart} > Add to card </Button>
        </div>
    );
}

export default ProductCard;
