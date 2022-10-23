import {React,useContext,useState} from 'react';
import {ProductContext} from '../../contexts/product.context';
import './product-card.styles.scss';
import Button from '../button/Button.component';

import { CartContext } from '../../contexts/cart.context';

const ProductCard = ({product}) => {

    const { addItemTocart } = useContext(CartContext);


    const addProductToCart = () => addItemTocart(product)
  
    const {name,price,imageUrl}= product;
    const cards = useContext(ProductContext)
    return (
        <div className='product-card-container' >

            <img src={imageUrl} alt={name}/>
            <div className="footer">
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType='inverted' onClick={addProductToCart} > Add to card </Button>
        </div>
    );
}

export default ProductCard;
