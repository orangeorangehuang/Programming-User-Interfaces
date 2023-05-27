import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <div className='footer'>
        <Link className='footer-element' to='/null'>
          Contact Us
        </Link>
        <Link className='footer-element' to='/null'>
          Site Map
        </Link>
        <Link className='footer-element' to='/null'>
          Privacy Policy
        </Link>
        <Link className='footer-element' to='/null'>
          Careers
        </Link>
        <Link className='footer-element' to='/null'>
          Reviews
        </Link>
        <div className='footer-element-credit'>Designed by Chia-Hung Huang</div>
      </div>
    </>
  );
};

export default Footer;