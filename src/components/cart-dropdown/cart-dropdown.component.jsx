import './cart-dropdown.styles.scss';
import CartItem from '../cart-item/cart-item.component';
import {useNavigate} from 'react-router-dom';

import {React,useContext} from 'react';

import { CartContext } from '../../contexts/cart.context';

import Button from '../button/Button.component';

const CartDropdown = () => {

    const navigate = useNavigate();

    const {cartItems} = useContext(CartContext);
  
    const goToCheckoutHandler = () =>{
        navigate('/checkout');
    }


    return (
        <div className='cart-dropdown-container'>
            <div className="cart-items">
                
                {cartItems.map( (item) => 
                   <CartItem key={item.id} cartItem={item} />
                 )}
               
            </div>
            <Button onClick={goToCheckoutHandler} > GO TO CHECKOUT </Button> 
            
        </div>
    );
}

export default CartDropdown;
