import React from 'react';

import './button.styles.scss'

const buttonTypeClasses = {

    google:'google-sign-in',
    inverter:'inverted'
}

const Button = ({children,buttonType,...otherProps}) => {
    return (
        <button className={`button-container ${buttonTypeClasses[buttonType]} `} {...otherProps}>
            {children}
        </button>
    );
}

export default Button;
