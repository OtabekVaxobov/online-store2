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

function Add(clicked_price: string) {
  LocalStore.cost += JSON.parse(clicked_price);
  LocalStore.count++;
}
 const CounterComponent = () => {
  const quant = document.getElementById('basket-count-span') as html;
  const cost = document.getElementById('cost-span') as html;

  // window.onload = () => {
    console.log('fan');
    const btn = document.querySelectorAll(
      '.product-card__btn-cart'
    ) as NodeList;
    btn.forEach((it) =>
      it.addEventListener('click', (e: any) => {
        const clicked_price =
          e.target?.parentElement.parentElement.innerText.slice(0, length - 2);
        LocalStore.text.push(
          e.target?.parentElement.parentElement.parentElement.innerText
        );
        LocalStore.html.push(
          e.target?.parentElement.parentElement.parentElement.innerHTML
        );
        Add(clicked_price);
        console.log(store.cost, LocalStore.cost);
        store.setItem('html', JSON.stringify(LocalStore.html));
        store.setItem('text', JSON.stringify(LocalStore.text));
        store.setItem('count', JSON.stringify(LocalStore.count));
        store.setItem('cost', JSON.stringify(LocalStore.cost));
        cost.innerText = JSON.parse(store.cost);
        quant.innerText = JSON.parse(store.count);
      })
    );
  // };
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
