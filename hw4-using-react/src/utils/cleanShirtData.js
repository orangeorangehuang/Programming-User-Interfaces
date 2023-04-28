import DefaultMaleFront from '../assets/shirt_images/default-m-front.png';

const cleanShirtData = (shirt) => {
  let element_title = shirt.name || 'Unnamed T-Shirt';
  // let element_description = shirt.description || "A world of mystery and wonder, shrouded in the veil of the unknown. (No description)";
  let element_description = shirt.description || "(No description)";
  let element_price,
    element_color_num,
    element_img,
    element_for_sale = true;

  if (shirt.colors === undefined || Object.keys(shirt.colors).length === 0) {
    element_for_sale = false;
    element_color_num = 'Not Available (No Color)';
    element_img = shirt.default !== undefined ? shirt.default.front : DefaultMaleFront;
  } else {
    element_color_num = `Available in ${Object.keys(shirt.colors).length} colors`;
    element_img = Object.values(shirt.colors)[0].front || DefaultMaleFront;
  }

  if (shirt.price === undefined) {
    element_for_sale = false;
    element_price = 'Not Available (No Price)';
    element_color_num = 'Not Available (No Price)';
  } else {
    element_price = shirt.price;
  }

  return {
    title: element_title,
    color_num: element_color_num,
    img: element_img,
    price: element_price,
    for_sale: element_for_sale,
    description: element_description
  };
};

export default cleanShirtData;
