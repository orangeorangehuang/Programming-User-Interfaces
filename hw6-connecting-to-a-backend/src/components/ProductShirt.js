import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

const ProductShirt = ({ id, image, title, text, for_sale }) => {
  const { setProduct, setDisplayImg, init_states } = useStateContext();
  const navigate = useNavigate();

  let onClickFunc = (e) => {
    // e.stoppropagation();
    setProduct(parseInt(e.target.id));
    setDisplayImg(image);
    init_states();
    navigate(`/shirt/${e.target.id}`);
  };

  return (
    <div className='item' id={id}>
      {for_sale ? (
        <>
          <img id={id} src={image} alt='product' className='item-img' onClick={onClickFunc}></img>
          <div className='item-title'>{title}</div>
          <div className='item-text'>{text}</div>
          <div className='item-button-box'>
            <div id={id} className='item-button' onClick={onClickFunc}>
              See Page
            </div>
          </div>
        </>
      ) : (
        <>
          <img src={image} alt='product' className='item-img item-img-disabled'></img>
          <div className='item-title'>{title}</div>
          <div className='item-text'>{text}</div>
          <div className='item-button-box'>
            <div id={id} className='item-button item-button-disabled'>
              Not for sale
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductShirt;
