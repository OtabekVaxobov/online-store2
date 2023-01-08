import { getElement } from '../general/general';

export class Footer {
  static parentClass: string;

  static draw() {
    let parent: Element;
    if (Footer.parentClass === '') {
      parent = document.body;
    } else {
      parent = getElement(Footer.parentClass);
    }
    let wrapper = document.querySelector('.footer-wrapper');
    if (wrapper !== null) return;
    wrapper = document.createElement('div');
    wrapper.classList.add('footer-wrapper');

    const footerTitle = document.createElement('span');
    footerTitle.classList.add('footer-title');
    footerTitle.textContent = 'Online Store 2023';

    wrapper.append(footerTitle);
    parent.append(wrapper);
  }
}