import {React,createContext,useReducer} from 'react';

const addCartItem = (cartItems,productToAdd) => {

    const existingCartItem = cartItems.find( (cartItem)=>{ 
      return (  cartItem.id === productToAdd.id )
     }  );
  
   if(existingCartItem){
       
    return cartItems.map(item =>{
      return  (item.id === productToAdd.id) ? {...item, quantity: item.quantity+1 } : item 
    } );

   }
   return [...cartItems,{...productToAdd,quantity:1}];
}

const removeCartItem = (cartItems,productToRemove) => {

    const existingCartItem = cartItems.find( (cartItem)=>{ 
        return (  cartItem.id === productToRemove.id )
       }  );

       if(existingCartItem.quantity === 1){
           return cartItems.filter( (cartItem) => cartItem.id !== productToRemove.id )
       }

       return cartItems.map(item =>{
        return  (item.id === productToRemove.id) ? {...item, quantity: item.quantity - 1 } : item 
      } );

}


const clearItemToCart = (cartItems,productToClear) => {
      return cartItems.filter( (cartItem) => cartItem.id !== productToClear.id);
}


const initialState = {
    cartItems : [],
    counter:0,
    total:0,
    isCartOpen: false
}

export const CART_ACTION_TYPE = {
    SET_CART_ITEMS : "SET_CART_ITEMS",
  }

const cartReducer = (state,action) => {

    const {type,payload} = action;
    console.log(type);
    console.log(payload);

 switch (type) {
    case "ADD_ITEM_TOCART" : 
    return {
        ...state,
        ...payload
    }
    case "SET_CART_IS_OPEN" :
        return {
            ...state,
            isCartOpen : payload
        }

    default :
    throw new Error("Unhandled type in cartReducer");
 }

}

export const CartContext = createContext({

    isCartOpen: false,
    setCartOpen: () =>{},
    cartItems:[],
    addItemTocart:() =>{},
    removeItemFromCart:() => {},
    clearItemFromCart:() =>{},
    counter:0,
    total:0

});


export const CartProvider =({children}) =>{
  
    // const [isCartOpen,setIsCartOpen] = useState(false);
    // const [cartItems,setCartItems] = useState([]);
    // const [counter,setCounter] = useState(0);
    // const [total,setTotal] = useState(0);


    const [{cartItems,counter,total,isCartOpen},dispatch] = useReducer( cartReducer,initialState);

     
    const updateCartItems = (newCartItems) =>{
        const newCartCount = newCartItems.reduce((total,cartItem) => total + cartItem.quantity,0 );
        const newCartTotal = newCartItems.reduce((total,cartItem) => total + cartItem.quantity * cartItem.price,0 );
        dispatch({type:"ADD_ITEM_TOCART",payload :
                                         {cartItems:newCartItems,
                                          counter:newCartCount,
                                          total: newCartTotal
                                         } 
                                         });
    }

    const addItemTocart = (productToAdd) =>{
        const newCartItems = addCartItem(cartItems,productToAdd);
        updateCartItems(newCartItems);
    } 

    const removeItemFromCart = (productToRemove) =>{
        const newCartItems = removeCartItem(cartItems,productToRemove);
        updateCartItems(newCartItems);
       
    } 

    const clearItemFromCart = (productToClear) =>{
        const newCartItems = clearItemToCart(cartItems,productToClear);
        updateCartItems(newCartItems);
    } 

    const setIsCartOpen = (boolen) =>{
        dispatch ({type:"SET_CART_IS_OPEN", payload : boolen } )
    }

    const value = {isCartOpen,setIsCartOpen, addItemTocart,removeItemFromCart,clearItemFromCart,cartItems,counter,total}
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}