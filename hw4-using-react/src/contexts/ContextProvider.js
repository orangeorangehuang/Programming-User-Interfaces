import React, { createContext, useContext, useState } from 'react';
import DefaultMaleFront from '../assets/shirt_images/default-m-front.png';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [cartNum, setCartNum] = useState(0);
  const [product, setProduct] = useState(0);
  const [displayImg, setDisplayImg] = useState(DefaultMaleFront);

  const [color, setColor] = useState('white');
  const [side, setSide] = useState('front');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const addToCart = (newProduct) => {
    setCart([...[newProduct], ...cart]);
  };

  const init_states = () => {
    setColor('white');
    setSide('front');
    setSize('');
    setQuantity(1);
  };

  const updateCartItemQuan = (updateId, updateQuan) => {
    let delta,
      temp_cart = [...cart];
    temp_cart.forEach((item, index) => {
      if (item.id === updateId) {
        delta = parseInt(updateQuan) - parseInt(temp_cart[index].quantity);
        temp_cart[index].quantity = parseInt(updateQuan);
      }
    });
    setCart(temp_cart);
    setCartNum(cartNum + delta);
  };

  const deleteCartItem = (updateId) => {
    let delta,
      temp_cart = [...cart];
    temp_cart.forEach((item, index) => {
      if (item.id === updateId) {
        delta = 0 - parseInt(temp_cart[index].quantity);
        temp_cart.splice(index, 1);
      }
    });
    setCart(temp_cart);
    setCartNum(cartNum + delta);
  };

  const checkout = () => {
    let subtotal_temp = 0;
    cart.forEach((item) => {
      subtotal_temp = (parseFloat(subtotal_temp) + parseFloat(item.price.slice(1)) * parseFloat(item.quantity)).toFixed(2);
    });
    setSubtotal(subtotal_temp);
    console.log(subtotal_temp);
  };

  return (
    <StateContext.Provider
      value={{
        cartNum,
        setCartNum,
        product,
        setProduct,
        displayImg,
        setDisplayImg,
        color,
        setColor,
        size,
        setSize,
        side,
        setSide,
        cart,
        setCart,
        quantity,
        setQuantity,
        addToCart,
        init_states,
        updateCartItemQuan,
        deleteCartItem,
        subtotal,
        checkout
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
