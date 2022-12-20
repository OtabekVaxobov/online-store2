import productData from '../../products/productsData';
import { CreateNodeI, getElement } from '../general/general';

type SliderValue = 'stock' | 'price';

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

    const maxValueStr = String(this.maxValue);
    const minValueStr = String(this.minValue);
    const lowerSlider = document.createElement('input');
    lowerSlider.type = 'range';
    lowerSlider.min = minValueStr;
    lowerSlider.max = maxValueStr;
    lowerSlider.value = minValueStr;
    const upperSlider = lowerSlider.cloneNode(true) as HTMLInputElement;
    upperSlider.min = minValueStr;
    upperSlider.max = maxValueStr;
    upperSlider.value = maxValueStr;

    lowerSlider.classList.add('dual-slider__lower');
    upperSlider.classList.add('dual-slider__upper');

    multiRange.append(lowerSlider);
    multiRange.append(upperSlider);
    nodeParent.append(title);
    nodeParent.append(multiRange);

    this.renderTitle(minValueStr, maxValueStr);

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
      console.log('current upper value: ' + upperSlider.value)
    })

    lowerSlider.addEventListener('change', (event) => {
      console.log('current lower value: ' + lowerSlider.value)
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
    title.textContent = `${minValue} - ${maxValue}`;
  }

  private getMaxValue(): number {
    return productData.products.reduce((acc, cur) => Math.max(acc, cur[this.sliderValue]), 0) ?? 0;
  }
}

/*const lowerSlider = document.querySelector('.dual-slider__lower') as HTMLInputElement;
const upperSlider = document.querySelector('.dual-slider__upper') as HTMLInputElement;
const sliderTitle = document.querySelector('.dual-slider__value') as HTMLSpanElement;
let maxStock: number = getMaxStock();
let step = Math.max(Math.floor(maxStock / 20), 1);
const maxStockStr = maxStock.toString();
lowerSlider.max = maxStockStr;
upperSlider.max = maxStockStr;
lowerSlider.value = '0';
upperSlider.value = maxStockStr;
lowerSlider.min = '0';
upperSlider.min = '0';
renderSliderTitle('0', maxStockStr);
const lowerVal: number = parseInt(lowerSlider.value);
const upperVal: number = parseInt(upperSlider.value);

upperSlider.oninput = function(): void {
  const lowerVal: number = parseInt(lowerSlider.value);
  const upperVal: number = parseInt(upperSlider.value);

  if (upperVal < lowerVal + step) {
  lowerSlider.value = (upperVal - step).toString();
    if (lowerVal.toString() === lowerSlider.min) {
        upperSlider.value = String(step);
    }
  }
  renderSliderTitle(lowerSlider.value, upperSlider.value);
};

lowerSlider.oninput = function(): void {
  const lowerVal: number = parseInt(lowerSlider.value);
  const upperVal: number = parseInt(upperSlider.value);
   
   if (lowerVal > upperVal - step) {
      upperSlider.value = (upperVal + step).toString();
      
      if (upperVal.toString() === upperSlider.max) {
         lowerSlider.value = (parseInt(upperSlider.max) - step).toString();
      }
   }
   renderSliderTitle(lowerSlider.value, upperSlider.value);
};

function renderSliderTitle(loverValue: string, upperValue: string): void {
  sliderTitle.textContent = `${loverValue} - ${upperValue}`;
}

function getMaxStock(): number {
  return productData.products.reduce((acc, cur) => Math.max(acc, cur.stock), 0) ?? 0;
}*/