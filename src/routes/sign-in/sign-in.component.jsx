import React from 'react';
import {signInWithGooglePopup,creatUserDocumentFromAuth} from "../../utils/firebase/firebase.utils"

const SignIn = () => {

    const logGoogleUser = async () =>{
        const {user} = await signInWithGooglePopup();
       const userDocRef = await creatUserDocumentFromAuth(user)
    }
    return (
        <div>

            <h1>sign in page</h1>

            <button onClick={logGoogleUser} > sign in with google</button>
            
        </div>
    );
}

export default SignIn;
