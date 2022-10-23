import {React,useContext,useState} from 'react';
import {ProductContext} from '../../contexts/product.context';
import './product-card.styles.scss';
import Button from '../button/Button.component';

const ProductCard = ({product}) => {
  
    const {name,price,imageUrl}= product;
    const cards = useContext(ProductContext)
    return (
        <div className='product-card-container' >

            <img src={imageUrl} alt={name}/>
            <div className="footer">
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType='inverted'> Add to card </Button>
        </div>
    );
}

export default ProductCard;
