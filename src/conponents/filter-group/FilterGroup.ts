import productData from '../../products/productsData';
import { CreateNodeI, getElement } from '../general/general';

export type GroupProperties = {
  name: 'category' | 'brand' | 'stock' | 'price';
  title: string;
}

export const FildeGroup = {
  Category: {name: 'category', title: 'Category'} as GroupProperties,
  Brand: {name: 'brand', title: 'Brand'} as GroupProperties,
  Stock: {name: 'stock', title: 'Stock'} as GroupProperties,
  Price: {name: 'price', title: 'Price'} as GroupProperties,
}

export interface FilterGroupI extends CreateNodeI {
  groupName: GroupProperties;
  additionalClass: string;
}

export class FilterGroup implements FilterGroupI {
  parentClass: string;
  groupName: GroupProperties;
  additionalClass: string;

  constructor(parentClass: string, groupName: GroupProperties, additionalClass?: string) {
    this.parentClass = parentClass;
    this.groupName = groupName;
    this.additionalClass = additionalClass || '';
  }

  draw() {
    const nodeParent = getElement(this.parentClass);

    const wrapper = document.createElement('div');
    wrapper.classList.add('filter-group', this.additionalClass);

    const title = document.createElement('h3');
    title.textContent = this.groupName.title;
    title.classList.add('filter-group__title');

    const checkboxes = document.createElement('div');
    checkboxes.classList.add('filter-group-checkbox');

    wrapper.append(title);
    wrapper.append(checkboxes);
    nodeParent.append(wrapper);

    const nodeCheckbox = document.createElement('div');
    nodeCheckbox.classList.add('checkbox-wpapper');
    const nodeLabel = document.createElement('label');
    nodeLabel.classList.add('checkbox-item');

    const nodeSpanTitle = document.createElement('span');
    nodeSpanTitle.classList.add('checkbox-item__title');

    const nodeInput = document.createElement('input');
    nodeInput.type = 'checkbox';
    nodeInput.classList.add('checkbox-item__input');

    const nodeSpan = document.createElement('span');
    nodeSpan.classList.add('checkbox-item__checkmark');

    nodeLabel.append(nodeSpanTitle);
    nodeLabel.append(nodeInput);
    nodeLabel.append(nodeSpan);

    const nodeSpanCount = document.createElement('span');
    nodeSpanCount.classList.add('checkbox__available');
    nodeSpanCount.textContent = '(5/5)';

    nodeCheckbox.append(nodeLabel);
    nodeCheckbox.append(nodeSpanCount);

    const group: {[key: string]: number} = {};
    for (let i = 0; i < productData.products.length; i += 1) {
      let curValue = productData.products[i];
      let groupName = curValue[this.groupName.name];
      group[groupName] = group[groupName] || 0;
      group[groupName] += 1;
    }

    for (const key in group) {
      const checkbox = nodeCheckbox.cloneNode(true) as HTMLDivElement;
      checkbox.children[0].children[0].textContent = key;
      if (checkbox.children[0].children[1] instanceof HTMLInputElement) {
        checkbox.children[0].children[1].setAttribute('data-group-name', key);
      }
      checkbox.children[1].textContent = `${group[key]}/${group[key]}`;
      checkboxes.append(checkbox);
    }

    checkboxes.addEventListener('change', (event) => {
      let target = event.target as Node;
      if (target instanceof HTMLInputElement) {
        console.log(`group ${target.dataset.groupName} ${(target.checked) ? 'set' : 'delete'}`)
      }
      //target = this.checkTypeElement<HTMLInputElement>(target, 'INPUT');
    })

  }

  /*private checkTypeElement<T>(node: Node | null, typeSrt: string): T {
    if (node?.nodeName === typeSrt) {
      return node as T;
    }
    throw new Error('unknown type');
  }*/
}