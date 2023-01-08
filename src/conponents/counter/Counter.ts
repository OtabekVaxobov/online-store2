import { Cart } from './Cart';

type html = HTMLElement;
interface Ilocal {
  cost: number;
  count: number;
  html: string[];
  text: string[];
}

const store = localStorage;
const LocalStore: Ilocal = {
  cost: 0,
  count: 0,
  html: [],
  text: [],
};

 const CounterComponent = () => {
  setTimeout(() => {
    const quant = document.getElementById('basket-count-span') as html;
    const cost = document.getElementById('cost-span') as html;
    const btn = document.querySelectorAll(
      '.product-card__btn-cart'
    ) as NodeList;
    btn.forEach((it) =>
      it.addEventListener('click', (e) => {
        const target = e.target;
        if ( !(target instanceof HTMLElement) ) return;
        const productsPage = target.closest(".product-card__btn-cart");
        if ( !(productsPage instanceof HTMLElement) ) return;
        const productCard = target.closest(".product-card");
        if ( !(productCard instanceof HTMLElement) ) return;
        const cardId = productCard.dataset.cardId;
        if (cardId === undefined) return;
        if (Cart.contains(Number(cardId))) {
          Cart.delete(Number(cardId));
        } else {
          Cart.add(Number(cardId));
        }
        productsPage.classList.toggle('btn_active');
        cost.innerText = String(Cart.getTotalCost());
        quant.innerText = String(Cart.getTotalCount());
      })
    );
  }, 0);
};

export function Rest_button() {
  LocalStore.cost = 0;
  LocalStore.count = 0;
  LocalStore.html = [];
  LocalStore.text = [];
  store.setItem('cost', LocalStore.cost.toString());
  store.setItem('count', LocalStore.count.toString());
  store.setItem('html', LocalStore.html.toString());
  store.setItem('text', LocalStore.text.toString());
}

export default CounterComponent;