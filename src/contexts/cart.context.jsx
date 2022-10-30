import {React,createContext, useState, useEffect} from 'react';

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
  
    const [isCartOpen,setIsCartOpen] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    const [counter,setCounter] = useState(0);
    const [total,setTotal] = useState(0);

    useEffect(() =>{
       const newCartCount = cartItems.reduce((total,cartItem) => total + cartItem.quantity,0 );
       setCounter(newCartCount)

    },[cartItems])

    useEffect(() =>{
        const newCartTotal = cartItems.reduce((total,cartItem) => total + cartItem.quantity * cartItem.price,0 );
        setTotal(newCartTotal);
 
     },[cartItems])

    const addItemTocart = (productToAdd) =>{
        setCartItems(addCartItem(cartItems,productToAdd));
    } 

    const removeItemFromCart = (productToRemove) =>{
        setCartItems(removeCartItem(cartItems,productToRemove));
    } 

    const clearItemFromCart = (productToClear) =>{
        console.log(clearItemToCart(cartItems,productToClear));
        setCartItems(clearItemToCart(cartItems,productToClear));
    } 

    const value = {isCartOpen,setIsCartOpen,addItemTocart,removeItemFromCart,clearItemFromCart,cartItems,counter,total}
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}