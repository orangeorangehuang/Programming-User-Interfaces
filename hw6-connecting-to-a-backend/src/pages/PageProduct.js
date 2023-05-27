import { ProductShirt } from '../components';
import { shirts } from '../shared';
import { cleanShirtData } from '../utils';

const PageProduct = () => {
  const shirtElements = shirts.map((shirt, id) => {
    const { title, color_num, img, for_sale } = cleanShirtData(shirt);

    return <ProductShirt key={id} id={id} image={img} title={title} text={color_num} for_sale={for_sale} />;
  });
  return (
    <>
      <div className='content-box'>
        <div className='content-title'>Our T-Shirts</div>
        <div className='content-container' id='content-container'>
          {shirtElements}
        </div>
      </div>
    </>
  );
};

export default PageProduct;
