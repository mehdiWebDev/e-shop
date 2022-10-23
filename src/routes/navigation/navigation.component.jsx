import { Outlet,Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import './navigation.styles.scss';
import { ReactComponent as EshopLogo } from "../../assets/eshop.svg";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import React from 'react';
import {signOutUser} from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/crad-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";


const Navigation = () => {

    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);
    console.log(isCartOpen);

    return (
       <Fragment>
        <div className="navigation">

            <Link className="logo-container"  to="/">

               <EshopLogo className="logo"/>
            
            </Link>
           
            <div className="nav-links-container">
               <Link className="nav-link" to="/shop">
                   shop 
               </Link>    
              
                   {
                       currentUser ? (
                           <span className="nav-link" onClick={signOutUser} > SIGN OUT </span>) : (  <Link className="nav-link" to="/auth"> SIGN IN </Link>  )
                   }

                   <CartIcon />
                  
        
            </div>

            { isCartOpen && <CartDropdown /> } 
        </div>

        <Outlet/>
    </Fragment>
    );
}

export default Navigation;

