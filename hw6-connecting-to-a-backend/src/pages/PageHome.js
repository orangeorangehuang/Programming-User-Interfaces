import banner from '../assets/images/banner.png';

const PageHome = () => {
  return (
    <>
      <div className='main-img-box'>
        <img className='main-img' src={banner} alt='main'></img>
      </div>
      <div className='main-text-box'>
        <div className='main-text'>
          <div className='main-text-title'>We don't ship. We're not real.</div>
          <div className='main-text-content'>
          Our shirt are made from high-quality materials and feature a stylish design that is sure to turn heads. Buy now and experience the comfort and confidence that come with wearing a premium shirt.
          </div>
        </div>
        <div className='main-text'>
          <div className='main-text-title'>Design your own shirt!</div>
          <div className='main-text-content'>
          Designing your own shirt is a fun and rewarding experience that allows you to stand out from the crowd and make a statement with your fashion choices. So why not try it out for yourself and see what kind of masterpiece you can create?
          </div>
        </div>
      </div>
    </>
  );
};

export default PageHome;
