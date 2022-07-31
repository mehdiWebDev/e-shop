import { initializeApp } from "firebase/app";

import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider } from "firebase/auth"

import {getFirestore,doc,getDoc,setDoc} from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyAwgq8Bj477jdSH_dWuIQfcLIiugZzVzqI",
    authDomain: "e-shop-db-488fe.firebaseapp.com",
    projectId: "e-shop-db-488fe",
    storageBucket: "e-shop-db-488fe.appspot.com",
    messagingSenderId: "690774661118",
    appId: "1:690774661118:web:b48c26ceff35ad8a08d2af"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
      prompt:"select_account"
  });


  export const auth =getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth,provider)
  export const db = getFirestore();

  export const creatUserDocumentFromAuth = async (userAuth) => {

    const userDocRef = doc(db,"users",userAuth.uid); 

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef)


    if(!userSnapshot.exists()){
              
        const {displayName,email}=userAuth
        const createDate = new Date();

        try{
        await setDoc(userDocRef,{displayName,email,createDate})
        }catch(e){
         
            console.log(e)
        }
    }


    return userDocRef;



    //check if user data exists

    //if user does not exist
    // creat/ set the document with the data from userAuth in my collection






  }
