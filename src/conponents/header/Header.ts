import { getElement } from '../general/general';

export class Header {
  static parentClass: string;

  static draw() {
    let parent: Element;
    if (Header.parentClass === '') {
      parent = document.body;
    } else {
      parent = getElement(Header.parentClass);
    }
    const header: HTMLElement = document.createElement('header');

    const wrapper = document.createElement('div');
    wrapper.classList.add('footer-wrapper');

    const footerTitle = document.createElement('span');
    footerTitle.classList.add('footer-title');
    footerTitle.textContent = 'Online Store 2023';

    wrapper.append(footerTitle);
    parent.append(wrapper);
  }
}

const HeaderComponent = async (): Promise<void> => {
  const header: HTMLElement = document.createElement('header');
  const sp2 = document.querySelector('.body-container') as HTMLElement;
   document.body.insertBefore(header, sp2);

  header.innerHTML = `
  <div class="header _main-container">
      <section class="header_container">
      <div class="header_logo">Alik_Express</div>
      <div class="header_cost">
      Cost:<span id="cost-span">0</span>$
      </div>
        <div id="basket">
          <img class="basket-img" src="./assets/basket.svg" />
          <div class="basket-count">
            Quantity:<span id="basket-count-span">0</span>
          </div>
        </div>
      </section>
    </div>
    `;
};

export default HeaderComponent;
