import React, { useEffect } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { useParams, useNavigate } from 'react-router-dom';

import { shirts, sizes } from '../shared';
import { cleanShirtData } from '../utils';
import DefaultMaleFront from '../assets/shirt_images/default-m-front.png';
import DefaultMaleBack from '../assets/shirt_images/default-m-back.png';

import { insertDocument } from '../firebase';

const PageDetail = () => {
  const { cartNum, setCartNum, displayImg, setDisplayImg, color, setColor, side, setSide, quantity, setQuantity, size, setSize, updateCart, isLoggedIn, userInfo } =
    useStateContext();
  const productId = useParams().productId;
  const navigate = useNavigate();
  const default_img = { front: DefaultMaleFront, back: DefaultMaleBack };
  const preview_img =
    shirts[productId] && shirts[productId].colors && Object.values(shirts[productId].colors)[0]['front']
      ? Object.values(shirts[productId].colors)[0]['front']
      : default_img.front;
  const shirt = shirts[productId];
  const { title, description, price, for_sale } = shirts[productId] ? cleanShirtData(shirt) : {};

  const change_quantity = (e) => {
    setQuantity(e.target.value);
  };

  const change_size = (e) => {
    setSize(e.target.value);
  };

  const click_color = (e) => {
    let color_temp = e.target.id;
    let img_temp = shirts[productId].colors[color_temp][side] || default_img[side];
    setColor(color_temp);
    setDisplayImg(img_temp);
  };

  const click_side = (e) => {
    let side_temp = e.target.id;
    let img_temp = shirts[productId].colors[color][side_temp] || default_img[side_temp];
    setSide(side_temp);
    setDisplayImg(img_temp);
  };

  const color_btns =
    shirt && shirt.colors ? (
      Object.keys(shirt.colors).map((color, index) => {
        return (
          <div key={index} id={color} className={`detail-content-color-button ${color}`} onClick={click_color}>
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </div>
        );
      })
    ) : (
      <></>
    );

  const quan_options = [...Array(20).keys()].map((num) => {
    return (
      <option key={num} value={num + 1}>
        {num + 1}
      </option>
    );
  });

  const size_options = sizes.map((s) => {
    return (
      <option key={s} value={s}>
        {s}
      </option>
    );
  });


  const submit = async () => {
    let img_temp = shirts[productId].colors[color]['front'] || default_img['front'];

    if (isLoggedIn && size !== '') {
      let time = new Date().getTime();
      await insertDocument(userInfo.uid, title, img_temp, null, quantity, color, size, price, time);
      console.log('insert cart');
    }
    updateCart(userInfo.uid);
    navigate('/cart');
  };

  useEffect(() => {
    let submit_btn = document.getElementById('submit');
    if (isLoggedIn && for_sale && size !== '' && price !== 'Not Available (No Price)') {
      submit_btn.classList.remove('detail-submit-button-disabled');
      submit_btn.addEventListener('click', submit);
    } else {
      submit_btn.classList.add('detail-submit-button-disabled');
      submit_btn.removeEventListener('click', submit);
    }
  }, [size, color, quantity, price, for_sale]);

  useEffect(() => {
    setDisplayImg(preview_img);
  }, [preview_img, setDisplayImg]);

  useEffect(() => {
    if (!shirt) navigate();
  }, [shirt, navigate]);

  return (
    <div className='detail-container'>
      <div className='detail-title' id='detail-title'>
        {title}
      </div>
      <div className='detail-content-box'>
        <img id='detail-content-img' src={displayImg} alt='detail'></img>
        <div className='detail-content-right'>
          <div id='detail-content-price'>{price}</div>
          <div id='detail-content-text'>{description}</div>
          <div className='detail-content'>
            <div className='detail-content-title'>Side: </div>
            <div className='detail-content-button-box'>
              <div id='front' className='detail-content-side-button' onClick={click_side}>
                Front
              </div>
              <div id='back' className='detail-content-side-button' onClick={click_side}>
                Back
              </div>
            </div>
          </div>
          <div className='detail-content'>
            <div className='detail-content-title'>Color: </div>
            <div className='detail-content-button-box'>{color_btns}</div>
          </div>
          <div className='detail-content'>
            <div className='detail-content-title'>Quantity: </div>
            <div className='detail-content-button-box'>
              <select className='detail-content-quan-select' onChange={change_quantity}>
                {quan_options}
              </select>
            </div>
          </div>
          <div className='detail-content'>
            <div className='detail-content-title'>Size: </div>
            <div className='detail-content-size-button-box'>
              <select className='detail-content-size-select' onChange={change_size}>
                <option value=''>Size</option>
                {size_options}
              </select>
            </div>
          </div>
          <div id='submit' className='detail-submit-button detail-submit-button-disabled'>
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageDetail;
