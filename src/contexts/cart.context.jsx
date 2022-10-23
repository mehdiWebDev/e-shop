import {React,createContext, useState, useEffect} from 'react';

const addCartItem = (cartItems,productToAdd) => {

    const existingCartItem = cartItems.find( (cartItem)=>{ 
      return (  cartItem.id == productToAdd.id )
     }  );
  
   if(existingCartItem){
       
    return cartItems.map(item =>{
      return  (item.id == productToAdd.id) ? {...item, quantity: item.quantity+1 } : item 
    } );

   }
   return [...cartItems,{...productToAdd,quantity:1}];
}

export const CartContext = createContext({

    isCartOpen: false,
    setCartOpen: () =>{},
    cartItems:[],
    addItemTocart:() =>{},
    counter:0,

});


export const CartProvider =({children}) =>{
  
    const [isCartOpen,setIsCartOpen] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    const [counter,setCounter] = useState(0);

    useEffect(() =>{
       const newCartCount = cartItems.reduce((total,cartItem) => total + cartItem.quantity,0 );

       setCounter(newCartCount)

    },[cartItems])

    const addItemTocart = (productToAdd) =>{
        setCartItems(addCartItem(cartItems,productToAdd,cartItems));
    } 
    const value = {isCartOpen,setIsCartOpen,addItemTocart,cartItems,counter}
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}