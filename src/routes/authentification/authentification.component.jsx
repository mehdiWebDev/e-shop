import React from 'react';
import SingUp from "../../components/sing-up-form/sing-up.component";
import SingIn from '../../components/sing-in-form/sing-in.component';
import "./authentification.styles.scss"


const Authentification = () => {


    return (
        <div className='authentification-container'>
    
            <SingIn />
            <SingUp />

        </div>
    );
}

export default Authentification;
