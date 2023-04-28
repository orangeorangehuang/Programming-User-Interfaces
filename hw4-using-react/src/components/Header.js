import React from 'react';
import logo from '../assets/images/logo.png';
import cart from '../assets/images/cart.png';
import { useStateContext } from '../contexts/ContextProvider';
import { Link } from 'react-router-dom';

const Header = () => {
  const { cartNum } = useStateContext();

  return (
    <>
      <div className='header-top'></div>
      <div className='header'>
        <Link className='header-left' to='/'>
          <img className='header-left-logo' src={logo} alt='logo'></img>
        </Link>
        <div className='header-mid'>Scotty Shirts U Illustrate (SSUI)</div>
        <div className='header-right'>
          <Link className='header-right-button' to='/cart'>
            <img className='header-right-logo' src={cart} alt='cart'></img>
            <div className='header-right-text'>{cartNum}</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
