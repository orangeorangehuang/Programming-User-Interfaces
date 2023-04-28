import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div className='menu' id='menu'>
      <Link className='menu-element' to='/shirts'>
        <div className='menu-name'>T-SHIRTS</div>
        <div className='menu-bar'></div>
      </Link>
      <Link className='menu-element' to='/null'>
        <div className='menu-name'>HOODIES</div>
        <div className='menu-bar'></div>
      </Link>
      <Link className='menu-element' to='/null'>
        <div className='menu-name'>CREATE YOUR OWN</div>
        <div className='menu-bar'></div>
      </Link>
      <Link className='menu-element' to='/null'>
        <div className='menu-name'>ABOUT US</div>
        <div className='menu-bar'></div>
      </Link>
      <Link className='menu-element' to='/null'>
        <div className='menu-name'>YOUR ACCOUNT</div>
        <div className='menu-bar'></div>
      </Link>
    </div>
  );
};

export default Menu;
