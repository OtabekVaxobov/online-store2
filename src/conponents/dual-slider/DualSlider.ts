import { productData } from '../../products/productsData';
import { CreateNodeI, getElement } from '../general/general';
import { QueryParameters, FilteredProducts } from '../queryParameters/QueryParameters';

type SliderValue = 'stock' | 'price';
type Range = {
  max: number;
  min: number;
}

interface DualSliderI extends CreateNodeI {
  readonly sliderValue: SliderValue;
  readonly maxValue: number;
  readonly minValue: number;
  renderTitle(minValue: string, maxValue: string): void
}

export class DualSlider implements DualSliderI {
  parentClass;
  sliderValue;
  private _step;
  maxValue;
  minValue;

  constructor(parentClass: string, sliderValue: SliderValue) {
    this.parentClass = parentClass;
    this.sliderValue = sliderValue;
    this.maxValue = this.getMaxValue();
    this._step = Math.max(Math.floor(this.maxValue / 20), 1);
    this.minValue = 0;
  }

  draw() {
    const nodeParent = getElement(this.parentClass);
    const title = document.createElement('span');
    title.textContent = '0 - 0';
    title.classList.add('dual-slider__value');

    const multiRange = document.createElement('div')
    multiRange.classList.add('multi-range');

    //const RangeSlider = this.getMaxMinValue();
    const maxValueStr = String(this.maxValue);
    const minValueStr = String(this.minValue);
    let rangeMin: string;
    let rangeMax: string;
    if (FilteredProducts.result.length === 0) {
      rangeMin = minValueStr;
      rangeMax = maxValueStr;
    } else if (this.sliderValue === 'price') {
      rangeMin = String(FilteredProducts.minPrice);
      rangeMax = String(FilteredProducts.maxPrice);
    } else if (this.sliderValue === 'stock') {
      rangeMin = String(FilteredProducts.minStock);
      rangeMax = String(FilteredProducts.maxStock);
    } else {
      throw new Error('Unable to determine slider range.');
    }

    const lowerSlider = document.createElement('input');
    lowerSlider.type = 'range';
    lowerSlider.min = minValueStr;
    lowerSlider.max = maxValueStr;
    lowerSlider.value = rangeMin;
    const upperSlider = lowerSlider.cloneNode(true) as HTMLInputElement;
    upperSlider.min = minValueStr;
    upperSlider.max = maxValueStr;
    upperSlider.value = rangeMax;

    lowerSlider.classList.add('dual-slider__lower');
    upperSlider.classList.add('dual-slider__upper');

    multiRange.append(lowerSlider);
    multiRange.append(upperSlider);
    nodeParent.append(title);
    nodeParent.append(multiRange);

    this.renderTitle(rangeMin, rangeMax);

    upperSlider.addEventListener('input', (event) => {
      const lowerVal: number = parseInt(lowerSlider.value);
      const upperVal: number = parseInt(upperSlider.value);
    
      if (upperVal < lowerVal + this._step) {
      lowerSlider.value = (upperVal - this._step).toString();
        if (lowerVal.toString() === lowerSlider.min) {
          upperSlider.value = String(this._step);
        }
      }
      this.renderTitle(lowerSlider.value, upperSlider.value);
    })

    upperSlider.addEventListener('change', (event) => {
      QueryParameters.add(`${this.sliderValue}_max`, upperSlider.value);
      FilteredProducts.LastFilter = this.sliderValue;
    })

    lowerSlider.addEventListener('change', (event) => {
      QueryParameters.add(`${this.sliderValue}_min`, lowerSlider.value);
      FilteredProducts.LastFilter = this.sliderValue;
    })

    lowerSlider.addEventListener('input', (event) => {
      const lowerVal: number = parseInt(lowerSlider.value);
      const upperVal: number = parseInt(upperSlider.value);
       
       if (lowerVal > upperVal - this._step) {
          upperSlider.value = (upperVal + this._step).toString();
          
          if (upperVal.toString() === upperSlider.max) {
            lowerSlider.value = (parseInt(upperSlider.max) - this._step).toString();
          }
       }
       this.renderTitle(lowerSlider.value, upperSlider.value);
    })
  }

  renderTitle(minValue: string, maxValue: string) {
    const nodeParent = getElement(this.parentClass);
    const title = getElement('.dual-slider__value', nodeParent);
    if (!(title instanceof HTMLSpanElement)) {
      throw new Error('title is not span!');
    }
    if (FilteredProducts.result.length === 0) {
      title.textContent = 'NOT FOUND';
    } else {
      title.textContent = `${minValue} - ${maxValue}`;
    }
  }

  /*private getMaxMinValue(): Range {
    let parameterMin = QueryParameters.get(`${this.sliderValue}_min`);
    let minValue: number;
    if (parameterMin) {
      minValue =  Number(parameterMin.values().next().value);
    } else {
      minValue = this.minValue;
    }

    let parameterMax = QueryParameters.get(`${this.sliderValue}_max`);
    let maxValue: number;
    if (parameterMax) {
      maxValue =  Number(parameterMax.values().next().value);
    } else {
      maxValue = this.maxValue;
    }
   
    return { max: maxValue, min: minValue };
  }*/

  private getMaxValue(): number {
    return productData.products.reduce((acc, cur) => Math.max(acc, cur[this.sliderValue]), 0) ?? 0;
  }
}