import { CreateNodeI, getElement } from '../../conponents/general/general';

export class Page404 implements CreateNodeI {
  parentClass: string;
  constructor(parentClass: string) {
    this.parentClass = parentClass;
  }

  draw() {
    const parent = getElement(this.parentClass);
    const wrapper = document.createElement('div');
    wrapper.classList.add('page404-wrapper');

    const errorMessage = document.createElement('div');
    errorMessage.classList.add('page404__error-message');
    errorMessage.textContent = 'PAGE NOT FOUND (404)';

    wrapper.append(errorMessage);
    parent.append(wrapper);
  }
}