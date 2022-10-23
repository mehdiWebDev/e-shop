import './cart-dropdown.styles.scss';
import CartItem from '../cart-item/cart-item.component';

import {React,useContext} from 'react';

import { CartContext } from '../../contexts/cart.context';

import Button from '../button/Button.component';

const CartDropdown = () => {

    const {cartItems} = useContext(CartContext);
  
    console.log(cartItems)


    return (
        <div className='cart-dropdown-container'>
            <div className="cart-items">
                
                {cartItems.map( (item) => 
                   <CartItem key={item.id} cartItem={item} />
                 )}
               
            </div>
            <Button > GO TO CHECKOUT </Button> 
            
        </div>
    );
}

export default CartDropdown;
