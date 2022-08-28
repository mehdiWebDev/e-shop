import React from 'react';
import { useState } from 'react';
import FormInput from '../form-input/Form-input.component';
import './sign-up-form.styles.scss'
import Button from '../button/Button.component';
import { createAuthUserWithEmailAndPassword,creatUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';


const defaultFormFields = {
    displayName:"",
    email:"",
    password:"",
    confirmPassword:""

}


const SignUp = () => {

const [FormFields,setdFormFields]= useState(defaultFormFields);
const {displayName,email,password,confirmPassword} = FormFields;


const resetFormField = (defaultFormFields)=>{
    setdFormFields(defaultFormFields)
}

const handleChange=(e)=>{

    const {name,value}=e.target;
    setdFormFields( {...FormFields,[name]:value} )

}


const handleSubmit = async (e)=>{


    e.preventDefault();

    if(password !== confirmPassword){
        alert("password don't match");
        return
    }

    try{
           
      const {user} = await createAuthUserWithEmailAndPassword(email,password);
      await creatUserDocumentFromAuth(user,{displayName})
      resetFormField(defaultFormFields);
        
    }catch(e){
        if(e.code === "auth/email-already-in-use"){
            alert("email already in use")
        }else{
            console.log(e)
        }
       
    }
    
   
}

    return (
        <div className='sign-up-container'>

            <h2>Don't have an account ? </h2>
            <span>Sign up with your email and password</span>

            <form onSubmit={ handleSubmit }>
            
                <FormInput label={"Display Name"} type="text" required onChange={handleChange} name="displayName" value={displayName} />
                <FormInput label={"Email"} type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label={"Password"} type="password" required onChange={handleChange} name="password" value={password} />
                <FormInput label={"Confirm Password"} type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />

                <button type='submit'> Sign Up </button>

                <Button buttonType={"sign-up"} type="submit" > Sign Up </Button>

            </form>
            
        </div>
    );
}

export default SignUp;
