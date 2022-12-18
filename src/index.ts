import './index.html';
import './index.css';
import { DualSlider } from './conponents/dual-slider/DualSlider';
import { FilterGroup, FildeGroup } from './conponents/filter-group/FilterGroup';
import { FilterGroupSlider } from './conponents/filter-group/FilterGroupSlider';

const groupCategory = new FilterGroup('.filters-wrapper', FildeGroup.Category, 'filter-category');
groupCategory.draw();

const groupBrand = new FilterGroup('.filters-wrapper', FildeGroup.Brand, 'filter-brand');
groupBrand.draw();

//const sliderPrice = new DualSlider('.dual-slider__price', 'price');
//sliderPrice.draw();

//const sliderStock = new DualSlider('.dual-slider__stock', 'stock');
//sliderStock.draw();

const sliderPrice = new FilterGroupSlider('.filters-wrapper', FildeGroup.Price);
sliderPrice.draw();

const sliderStock = new FilterGroupSlider('.filters-wrapper', FildeGroup.Stock);
sliderStock.draw();
