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

const HeaderComponent = (): html => {
  const header: html = document.createElement('header');
  const main = document.body.querySelector('.main-container') as html;
  const sp2 = document.querySelector('.main') as html;
  main.insertBefore(header, sp2);
  header.innerHTML = `
  <div class="header _main-container">
      <section class="header_container">
      <div class="header_logo">Alik_Express</div>
      <div class="header_cost">
      Cost:<span id="cost-span">${store.getItem('cost')}</span>$
      </div>
        <div id="basket">
          <img class="basket-img" src="./assets/basket.svg" />
          <div class="basket-count">
            Quantity:<span id="basket-count-span">${store.getItem(
              'count'
            )}</span>
          </div>
        </div>
      </section>
    </div>
    `;
  return header;
};
function Add (clicked_price: string){
  LocalStore.cost += parseInt(clicked_price);
  LocalStore.count++;
}
export const Quantity = () => {
  const quant = document.getElementById('basket-count-span') as html;
  const cost = document.getElementById('cost-span') as html;
  const fan = () => {
    window.onload = () => {
      document
        .querySelector('.filter-btn__rest')
        ?.addEventListener('click', () => {
          LocalStore.cost = 0;
          LocalStore.count = 0;
          LocalStore.html = [];
          LocalStore.text = [];
          store.setItem('cost', LocalStore.cost.toString());
          store.setItem('count', LocalStore.count.toString());
          store.setItem('html', LocalStore.html.toString());
          store.setItem('text', LocalStore.text.toString());
        });
      console.log('fan');
      const btn = document.querySelectorAll(
        '.product-card__btn-cart'
      ) as NodeList;
      btn.forEach((it) =>
        it.addEventListener('click', (e: any) => {
          const clicked_price =
            e.target?.parentElement.parentElement.innerText.slice(0, length - 2);
            LocalStore.text.push(e.target?.parentElement.parentElement.parentElement.innerText)
            LocalStore.html.push(e.target?.parentElement.parentElement.parentElement.innerHTML)
            console.log(LocalStore.html)
            Add(clicked_price);
          cost.innerText = store.cost.toString();
          quant.innerText = store.count.toString();
          store.setItem('html', JSON.stringify(LocalStore.html));
          store.setItem('text', JSON.stringify(LocalStore.text));
          store.setItem('count', LocalStore.count.toString());
          store.setItem('cost', LocalStore.cost.toString());
        })
      );
    };
  };
  fan();
};
export default HeaderComponent;
