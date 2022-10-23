import './cart-dropdown.styles.scss';


import React from 'react';
import Button from '../button/Button.component';

const CartDropdown = () => {
    return (
        <div className='cart-dropdown-container'>
            <div className="cart-items">
                <Button > GO TO CHECKOUT </Button>
            </div>
            
        </div>
    );
}

export default CartDropdown;
