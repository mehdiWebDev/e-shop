import {  createContext,useEffect,useReducer } from "react";

import {onAuthStateChangedListener,creatUserDocumentFromAuth} from "../utils/firebase/firebase.utils"



export const UserContext = createContext({

    currentUser: null,
    setCurrentUser:() => null

});

export const USER_ACTION_TYPR = {
  SET_CURRENT_USER : "SET_CURRENT_USER"
}

const userReducer = (state,action) => {
 
  console.log(action);

  const {type,payload} = action;

  switch(type) {
    case USER_ACTION_TYPR.SET_CURRENT_USER:
      return {
        ...state,
        currentUser : payload
      }
    
     default :
     throw new Error("Unhandled type in userReducer");

  }

}

export const UserProvider =({children})=>{
   
 
    const [ {currentUser} , dispatch ] = useReducer(userReducer,{currentUser:null});
   console.log(currentUser);
    const setCurrentUser = (user) =>{
      dispatch({type:USER_ACTION_TYPR.SET_CURRENT_USER,payload:user})
    }

    const value = {currentUser,setCurrentUser};

    useEffect(() =>{
      const unsubscribe =  onAuthStateChangedListener((user)=>{

        if(user){
            creatUserDocumentFromAuth(user);
        }
          setCurrentUser(user);
         
      })


      return unsubscribe
    },[]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}