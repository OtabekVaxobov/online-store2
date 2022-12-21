import './index.html';
import './index.css';
import { FilterGroup, FildeGroup } from './conponents/filter-group/FilterGroup';
import { FilterGroupSlider } from './conponents/filter-group/FilterGroupSlider';
import { SortBar } from './conponents/sort-bar/SortBar';
import { ProductCard } from './conponents/product-card/ProductCard';

const groupCategory = new FilterGroup('.filters-wrapper__checkbox', FildeGroup.Category, 'filter-category');
groupCategory.draw();

const groupBrand = new FilterGroup('.filters-wrapper__checkbox', FildeGroup.Brand, 'filter-brand');
groupBrand.draw();

const sliderPrice = new FilterGroupSlider('.filters-wrapper__slider', FildeGroup.Price);
sliderPrice.draw();

const sliderStock = new FilterGroupSlider('.filters-wrapper__slider', FildeGroup.Stock);
sliderStock.draw();

const sortBar = new SortBar('.products');
sortBar.draw();

const productCard = new ProductCard('.products-card-wrapper', './assets/basket.svg');
productCard.draw();

