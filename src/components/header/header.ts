type html = HTMLElement;
const HeaderComponent = (): HTMLElement => {
  const header: html = document.createElement('header');
  const main = document.body.querySelector('.main-container') as html;
  const sp2 = document.querySelector('.main') as html;
  main.insertBefore(header, sp2);
  header.innerHTML = `<div class="page-header _main-container">
      <section class="header _container">
        <div id="basket">
          <img class="basket-img" src="./assets/basket.svg" />
          <div class="basket-count">
            Quantity:<span id="basket-count-span">0</span>
          </div>
        </div>
      </section>
    </div>`;
  let count = 0;
  const count_span = document.getElementById(
    'basket-count-span'
  ) as HTMLElement;
  document.getElementById('basket')?.addEventListener('click', () => {
    count++;
    count_span.innerHTML = count.toString();
  });
  return header;
};

export default HeaderComponent;
