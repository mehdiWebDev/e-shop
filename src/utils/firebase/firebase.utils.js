import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth"

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyAwgq8Bj477jdSH_dWuIQfcLIiugZzVzqI",
  authDomain: "e-shop-db-488fe.firebaseapp.com",
  projectId: "e-shop-db-488fe",
  storageBucket: "e-shop-db-488fe.appspot.com",
  messagingSenderId: "690774661118",
  appId: "1:690774661118:web:b48c26ceff35ad8a08d2af",
};

// Initialize Firebase
 initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});


export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();


export const addCollectionAndDocument = async (collectionKey, objectsToAdd) => {

  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done")

}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const  q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot) =>{
    const {title,items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  },{})

  return categoryMap;
}

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


export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)