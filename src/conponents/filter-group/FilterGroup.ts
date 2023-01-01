import { productData } from '../../products/productsData';
import { CreateNodeI, getElement } from '../general/general';
import { QueryParameters, FilteredProducts } from '../queryParameters/QueryParameters';

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
  readonly parentClass: string;
  readonly groupName: GroupProperties;
  readonly additionalClass: string;

  constructor(parentClass: string, groupName: GroupProperties, additionalClass?: string) {
    this.parentClass = parentClass;
    this.groupName = groupName;
    this.additionalClass = (additionalClass !== undefined) ? additionalClass : '';
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
      const curValue = productData.products[i];
      const groupName = curValue[this.groupName.name];

      group[groupName] = (group[groupName] === undefined) ? 0 : group[groupName];
      group[groupName] += 1;
    }

    const groupFiltered: {[key: string]: number} = {};
    for (let i = 0; i < FilteredProducts.result.length; i += 1) {
      const curValue = FilteredProducts.result[i];
      const groupName = curValue[this.groupName.name];
      groupFiltered[groupName] = (groupFiltered[groupName] === undefined) ? 0 : groupFiltered[groupName];
      groupFiltered[groupName] += 1;
    }

    const parameters = QueryParameters.get(this.groupName.name);
    for (const key in group) {
      const checkbox = nodeCheckbox.cloneNode(true) as HTMLDivElement;
      checkbox.children[0].children[0].textContent = key;
      const input = checkbox.children[0].children[1];
      if (input instanceof HTMLInputElement) {
        input.setAttribute('data-group-name', key);
        if (parameters) {
          if (parameters.has(key)) input.checked = true;
        }
      }
      const available = (groupFiltered[key] === undefined) ? 0 : groupFiltered[key];
      checkbox.children[1].textContent = `${available}/${group[key]}`;
      if (available === 0) {
        checkbox.classList.add('checkbox-item__empty');
      }
      checkboxes.append(checkbox);
    }

    checkboxes.addEventListener('change', (event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement && target.dataset.groupName !== undefined) {
        if (target.checked) {
          QueryParameters.add(this.groupName.name, target.dataset.groupName, true);
          FilteredProducts.LastFilter = this.groupName.name;
        } else {
          QueryParameters.delete(this.groupName.name, target.dataset.groupName);
        }
      }
    })

  }

}