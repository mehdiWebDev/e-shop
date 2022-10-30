import React from 'react';
import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, creatUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from './../form-input/form-input.component';
import "./sign-up-form.styles.scss";
import Button, {buttonTypeClasses} from '../button/Button.component';

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}


const SingUp = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);

    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();


        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }

        try {

            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await creatUserDocumentFromAuth(user, { displayName });
            resetFormFields();

        } catch (e) {
            console.log("User cration encountered an error", e);
        }

    }
    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your Email and password</span>

            <form onSubmit={handleSubmit}>

                <FormInput
                    label="Display Name"
                    type="text"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName} />

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

                <FormInput
                    label="Confirm Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword} />

             

                <Button type="submit" buttonType={buttonTypeClasses.base}> Sign up </Button>

            </form>

        </div>
    );
}

export default SingUp;
