import scotty from '../assets/images/scotty.png'

const PageNull = () => {
  return (
    <div className='null'>
      <img className='null-img' src={scotty} alt='null'></img>
      <div className='null-text'>Oops, this page doesn't exist yet... How about a shirt from the last page?</div>
    </div>
  );
};

export default PageNull;
