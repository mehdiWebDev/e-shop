import { Outlet,Link } from "react-router-dom";
import { Fragment } from "react";
import './navigation.styles.scss';

import { ReactComponent as EshopLogo } from "../../assets/eshop.svg";

import React from 'react';

const Navigation = () => {
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

               <Link className="nav-link" to="/sign-in">
                   Sign in 
               </Link>    
            </div>
   
        </div>

        <Outlet/>
    </Fragment>
    );
}

export default Navigation;

