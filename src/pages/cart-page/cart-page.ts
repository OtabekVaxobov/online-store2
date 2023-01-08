import { Cart } from '../../conponents/counter/Cart';
import { getElement } from '../../conponents/general/general';


export default function  CartPage() {
    const parent = getElement('.body-container');
    const wrapper = document.createElement('div');
    wrapper.classList.add('cart-wrapper');
    console.log(Cart.getTotalCount())
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

