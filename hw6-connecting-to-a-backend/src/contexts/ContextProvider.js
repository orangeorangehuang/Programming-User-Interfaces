import React, { createContext, useContext, useState } from 'react';
import DefaultMaleFront from '../assets/shirt_images/default-m-front.png';

import { getUserDocuments, updateDocumentQuan, deleteDocument } from '../firebase';

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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const [queryResult, setQueryResult] = useState([]);
  const [queryString, setQueryString] = useState('');
  const [queryColor, setQueryColor] = useState('');
  const [queryPageNum, setQueryPageNum] = useState(1);
  const [queryOrient, setQueryOrient] = useState('');
  const [queryOrder, setQueryOrder] = useState('');
  const [selectedResult, setSelectedResult] = useState('');
  const [advance, setAdvance] = useState(false);
  const [sizeCreate, setSizeCreate] = useState('');
  const [quantityCreate, setQuantityCreate] = useState(1);

  const updateCart = async (userId) => {
    const newCart = await getUserDocuments(userId);
    setCart(newCart);
    updateCartNum(newCart);
    console.log('update cart', newCart);
  };

  const updateCartNum = (newCart) => {
    let cnt = 0;
    newCart.forEach((item, index) => {
      console.log(item.id);
      cnt = cnt + parseInt(item.quan);
    });
    setCartNum(cnt);
  };

  const init_states = () => {
    setColor('white');
    setSide('front');
    setSize('');
    setQuantity(1);
  };

  const updateCartItemQuan = async (userId, updateId, updateQuan) => {
    await updateDocumentQuan(updateId, updateQuan);
    updateCart(userId);
  };

  const deleteCartItem = async (userId, updateId) => {
    console.log(updateId);
    await deleteDocument(updateId);
    updateCart(userId);
  };

  const checkout = () => {
    let subtotal_temp = 0;
    cart.forEach((item) => {
      let priceString = String(item.price);
      subtotal_temp = (parseFloat(subtotal_temp) + parseFloat(priceString.slice(1)) * parseFloat(item.quan)).toFixed(2);
    });
    setSubtotal(subtotal_temp);
  };

  const clearAllStates = () => {
    setCartNum(0);
    setProduct(0);
    setDisplayImg(DefaultMaleFront);
    setColor('white');
    setSide('front');
    setSize('');
    setQuantity(1);
    setCart([]);
    setSubtotal(0);
    setIsLoggedIn(false);
    setUserInfo({});
    setQueryResult([]);
    setQueryString('');
    setQueryColor('');
    setQueryPageNum(1);
    setQueryOrient('');
    setQueryOrder('');
    setSelectedResult('');
    setAdvance(false);
    setSizeCreate('');
    setQuantityCreate(1);
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
        updateCart,
        init_states,
        updateCartItemQuan,
        deleteCartItem,
        subtotal,
        checkout,
        isLoggedIn,
        setIsLoggedIn,
        userInfo,
        setUserInfo,
        queryResult,
        setQueryResult,
        queryString,
        setQueryString,
        queryColor,
        setQueryColor,
        queryPageNum,
        setQueryPageNum,
        queryOrient,
        setQueryOrient,
        queryOrder,
        setQueryOrder,
        selectedResult,
        setSelectedResult,
        advance,
        setAdvance,
        sizeCreate,
        setSizeCreate,
        quantityCreate,
        setQuantityCreate,
        clearAllStates,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
