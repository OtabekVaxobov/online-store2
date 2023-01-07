import { Cart } from '../counter/Cart';

const HeaderComponent = async (): Promise<void> => {
  const header: HTMLElement = document.createElement('header');
  const sp2 = document.querySelector('.body-container') as HTMLElement;
   document.body.insertBefore(header, sp2);

  header.innerHTML = `
  <div class="header _main-container">
      <section class="header_container">
      <a href="/" class="header_logo">Online Store</a>
      <div class="header_cost">
      Cost: <span id="cost-span">${Cart.getTotalCost()}</span>$
      </div>
        <a href="#/cart" id="basket">
          <img class="basket-img" src="./assets/basket.svg" />
          <div class="basket-count">
            <span id="basket-count-span">${Cart.getTotalCount()}</span>
          </div>
        </a>
      </section>
    </div>
    `;
};

export const renderHeaderCounter = async (): Promise<void> =>  {
  const quant = document.getElementById('basket-count-span') as HTMLElement;
  const cost = document.getElementById('cost-span') as HTMLElement;
  cost.textContent = String(Cart.getTotalCost());
  quant.textContent = String(Cart.getTotalCount());
}

export default HeaderComponent;
