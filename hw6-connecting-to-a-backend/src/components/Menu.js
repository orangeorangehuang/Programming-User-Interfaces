import { Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

const Menu = () => {
  const { isLoggedIn, userInfo } = useStateContext();
  return (
    <div className='menu' id='menu'>
      <Link className='menu-element' to='/shirts'>
        <div className='menu-name'>T-SHIRTS</div>
        <div className='menu-bar'></div>
      </Link>
      <Link className='menu-element' to='/create'>
        <div className='menu-name'>CREATE FROM PICTURE</div>
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
      {isLoggedIn ? (
        <Link className='menu-element' to='/login'>
          <div className='menu-name'>
            <img className='menu-avatar' src={userInfo.photoURL} alt='Avatar' />
            <div className='menu-text'>{userInfo.displayName}</div>
          </div>
          <div className='menu-bar'></div>
        </Link>
      ) : (
        <Link className='menu-element' to='/login'>
          <div className='menu-name'>LOG IN</div>
          <div className='menu-bar'></div>
        </Link>
      )}
    </div>
  );
};

export default Menu;
