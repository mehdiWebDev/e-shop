import { Outlet,Link } from "react-router-dom";
import { Fragment, useContext } from "react";

import { ReactComponent as EshopLogo } from "../../assets/eshop.svg";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import React from 'react';
import {signOutUser} from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/crad-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";


import {NavigationContainer,LogoContainer,NavLinks,Navlink} from './navigation.styles';




const Navigation = () => {

    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);
    

    return (
       <Fragment>
        <NavigationContainer>

            <LogoContainer  to="/">

               <EshopLogo className="logo"/>
            
            </LogoContainer>
           
            <NavLinks>
               <Navlink to="/shop">
                   shop 
               </Navlink>    
              
                   {
                       currentUser ? (
                           <Navlink as='span' onClick={signOutUser} > SIGN OUT </Navlink>) : (  <Navlink to="/auth"> SIGN IN </Navlink>  )
                   }

                   <CartIcon />
                  
        
            </NavLinks>

            { isCartOpen && <CartDropdown /> } 
        
        </NavigationContainer>
        <Outlet/>
    </Fragment>
    );
}

export default Navigation;

