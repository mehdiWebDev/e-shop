import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
  } from "firebase/auth"

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyAwgq8Bj477jdSH_dWuIQfcLIiugZzVzqI",
  authDomain: "e-shop-db-488fe.firebaseapp.com",
  projectId: "e-shop-db-488fe",
  storageBucket: "e-shop-db-488fe.appspot.com",
  messagingSenderId: "690774661118",
  appId: "1:690774661118:web:b48c26ceff35ad8a08d2af",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});


export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();




export const creatUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);


  const userSnapshot = await getDoc(userDocRef);

 

  //check if user data exists

  //if user does not exist
  // creat/ set the document with the data from userAuth in my collection

  if (!userSnapshot.exists()) {

    const { displayName, email } = userAuth
    const createDate = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createDate, ...additionalInformation })
    } catch (e) {
      console.log(e)
    }
  }


  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {

  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}


export const signInAuthUserWithEmailAndPassword = async (email, password) => {

  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}
