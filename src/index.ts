import './index.html';
import './index.css';
import { FilterGroup, FildeGroup } from './conponents/filter-group/FilterGroup';
import { FilterGroupSlider } from './conponents/filter-group/FilterGroupSlider';
import { ProductCard } from './conponents/product-card/ProductCard';

const groupCategory = new FilterGroup('.filters-wrapper', FildeGroup.Category, 'filter-category');
groupCategory.draw();

const groupBrand = new FilterGroup('.filters-wrapper', FildeGroup.Brand, 'filter-brand');
groupBrand.draw();

const sliderPrice = new FilterGroupSlider('.filters-wrapper', FildeGroup.Price);
sliderPrice.draw();

const sliderStock = new FilterGroupSlider('.filters-wrapper', FildeGroup.Stock);
sliderStock.draw();

const productCard = new ProductCard('.products-card-wrapper', './assets/cart.svg');
productCard.draw();
console.log(productCard.length)
