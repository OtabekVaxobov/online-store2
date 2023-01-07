setTimeout(() => {
  
}, 0);
const HeaderComponent = async (): Promise<void> => {
  const header: HTMLElement = document.createElement('header');
  const sp2 = document.querySelector('.body-container') as HTMLElement;
   document.body.insertBefore(header, sp2);

  header.innerHTML = `
  <div class="header _main-container">
      <section class="header_container">
      <a href="/" class="header_logo">Alik_Express</a>
      <div class="header_cost">
      Cost:<span id="cost-span">${localStorage.getItem('cost')}</span>$
      </div>
        <a href="#/cart" id="basket">
          <img class="basket-img" src="./assets/basket.svg" />
          <div class="basket-count">
            Quantity:<span id="basket-count-span">${localStorage.getItem('count')}</span>
          </div>
        </a>
      </section>
    </div>
    `;
};

export default HeaderComponent;
