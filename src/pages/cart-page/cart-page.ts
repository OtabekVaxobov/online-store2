import { Cart, getCart } from '../../conponents/counter/Cart';
import { getElement } from '../../conponents/general/general';
import {productData} from '../../products/productsData';

const id = getCart().products.map((elem) => {
  return elem.id;
});
const cart = productData.products.filter((el) => {
  return el;
});




export default function  CartPage() {
  console.log(cart)
  console.log(id);
    const parent = getElement('.body-container');
    const wrapper = document.createElement('div');
    wrapper.classList.add('cart-wrapper');
    if (Cart.getTotalCount() <= 0) {
      const emptyMessage = document.createElement('div');
      emptyMessage.classList.add('page404__error-message');
      emptyMessage.textContent = 'Cart is empty';
      wrapper.append('');
      wrapper.append(emptyMessage);
      parent.append(wrapper);
    } else {
      const basket = document.createElement('div');
      basket.classList.add('test');
      basket.textContent = 'list';
      wrapper.append('');
      wrapper.append(basket);
      parent.append(wrapper);
    }

}

// var newArray = obj.Students.filter(function (el) {
//   return el.Age >= 15 && el.RollNumber <= 200 && el.Marks >= 80;
// });
// console.log(newArray);