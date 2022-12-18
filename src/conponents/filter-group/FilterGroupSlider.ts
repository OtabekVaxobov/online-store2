import { getElement } from '../general/general';
import { FilterGroup, GroupProperties, FildeGroup } from './FilterGroup';
import { DualSlider } from '../dual-slider/DualSlider';

export class FilterGroupSlider extends FilterGroup {
  constructor(parentClass: string, groupName: GroupProperties) {
    super(parentClass, groupName);
  }

  async draw() {
    const nodeParent = getElement(this.parentClass);

    const wrapper = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = this.groupName.title;
    title.classList.add('filter-group__title');

    const sliderWrapper = document.createElement('div');
    sliderWrapper.classList.add('dual-slider');
    let addClass = '';
    if (this.groupName === FildeGroup.Stock) {
      addClass = 'dual-slider__stock';
      wrapper.classList.add('filter-group', 'filter-stock');
    } else if (this.groupName === FildeGroup.Price) {
      addClass = 'dual-slider__price';
      wrapper.classList.add('filter-group', 'filter-price');
    }

    sliderWrapper.classList.add(addClass);

    wrapper.append(title);
    wrapper.append(sliderWrapper);
    nodeParent.append(wrapper);

    if (!(this.groupName.name === 'stock' || this.groupName.name === 'price')) {
      throw new Error(`No SliderValue type.`);
    }

    const sliderPrice = new DualSlider(`.${addClass}`, this.groupName.name);
    setTimeout(() => {
      sliderPrice.draw();
    }, 0);
  }
}