import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { app } from '../firebase';
import { useStateContext } from '../contexts/ContextProvider';

const PageLogin = () => {
  const { isLoggedIn, setIsLoggedIn, userInfo, setUserInfo, updateCart, clearAllStates } = useStateContext();
  const navigate = useNavigate();

  const handleLogIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setIsLoggedIn(true);
        setUserInfo(user);
        updateCart(user.uid);
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleSignOut = () => {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        console.log('Sign-out successful.');
        clearAllStates();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='login-wrapper'>
      {isLoggedIn ? (
        <div className='login-button' onClick={handleSignOut}>
          Log out as {userInfo.displayName}
        </div>
      ) : (
        <div className='login-button' onClick={handleLogIn}>
          Log In with Google
        </div>
      )}
    </div>
  );
};

export default PageLogin;
