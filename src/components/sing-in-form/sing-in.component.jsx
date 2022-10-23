import React from 'react';
import { useState } from 'react';
import {
    creatUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import "./sign-in-form.styles.scss";
import Button from '../button/Button.component';



const defaultFormFields = {
    email: "",
    password: "",
}


const SingIn = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
   
    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value })
    }

    const signInWithGoogle = async () => {

        const { user } = await signInWithGooglePopup();

    }


    const handleSubmit = async (e) => {
        e.preventDefault();


        try {

            const {user} = await signInAuthUserWithEmailAndPassword(email, password)
            
           
            resetFormFields();

        } catch (e) {


            switch (e.code) {
                case "auth/wrong-password": alert("incorrect password form email");
                    break;
                case "auth/user-not-found": alert("no user associated with this email");
                    break;
                default: console.log(e)
            }

        }

    }
    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with email and password</span>

            <form onSubmit={handleSubmit}>

                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email} />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password} />




                <div className='buttons-container'>
                    <Button type="submit"> Sign in </Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>google Sign in</Button>
                </div>


            </form>

        </div>
    );
}

export default SingIn;
