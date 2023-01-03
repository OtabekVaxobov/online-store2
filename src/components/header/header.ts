type html = HTMLElement;
interface Ilocal {
  cost: number;
  count: number;
}
const store = localStorage;
const LocalStore: Ilocal = {
  cost: 0,
  count: 0,
};

const HeaderComponent = (): html => {
  console.log(LocalStore);
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

export const Quantity = (): any => {
  const quant = document.getElementById('basket-count-span') as html;
  const cost = document.getElementById('cost-span') as html;
  const fan = () => {
    window.onload = () => {
      document
        .querySelector('.filter-btn__rest')
        ?.addEventListener('click', () => {
          LocalStore.cost = 0;
          LocalStore.count = 0;
          window.localStorage.setItem('cost', LocalStore.cost.toString());
          window.localStorage.setItem('count', LocalStore.count.toString());
        });
      console.log('fan');
      const btn = document.querySelectorAll(
        '.product-card__btn-cart'
      ) as NodeList;
      btn.forEach((it) =>
        it.addEventListener('click', (e: any) => {
          const clicked_price =
            e.target.parentElement.parentElement.innerText.slice(0, length - 2);
          LocalStore.cost += parseInt(clicked_price);
          LocalStore.count++;
          cost.innerText = LocalStore.cost.toString();
          quant.innerText = LocalStore.count.toString();
          store.setItem('count', LocalStore.count.toString());
          store.setItem('cost', LocalStore.cost.toString());
        })
      );
    };
  };
  fan();
};
export default HeaderComponent;
// var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];

// var newItem = {
//     'product-name': itemContainer.find('h2.product-name a').text(),
//     'product-image': itemContainer.find('div.product-image img').attr('src'),
//     'product-price': itemContainer.find('span.product-price').text()
// };

// oldItems.push(newItem);

// localStorage.setItem('itemsArray', JSON.stringify(oldItems));
