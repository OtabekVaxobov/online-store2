import {
  FilterGroup,
  FildeGroup,
} from '../../components/filter-group/FilterGroup';
import { FilterGroupSlider } from '../../components/filter-group/FilterGroupSlider';
import { SortBar } from '../../components/sort-bar/SortBar';
import { ProductCard } from '../../components/product-card/ProductCard';
import {
  QueryParameters,
  FilteredProducts,
} from '../../components/queryParameters/QueryParameters';
import HeaderComponent from '../../components/header/header';
export class MainPage {
  groupCategory: FilterGroup;
  groupBrand: FilterGroup;
  sliderPrice: FilterGroupSlider;
  sliderStock: FilterGroupSlider;
  sortBar: SortBar;
  productCard: ProductCard;
  constructor() {
    this.groupCategory = new FilterGroup(
      '.filters-wrapper__checkbox',
      FildeGroup.Category,
      'filter-category'
    );
    this.groupBrand = new FilterGroup(
      '.filters-wrapper__checkbox',
      FildeGroup.Brand,
      'filter-brand'
    );
    this.sliderPrice = new FilterGroupSlider(
      '.filters-wrapper__slider',
      FildeGroup.Price
    );
    this.sliderStock = new FilterGroupSlider(
      '.filters-wrapper__slider',
      FildeGroup.Stock
    );
    this.sortBar = new SortBar('.products');
    this.productCard = new ProductCard(
      '.products-card-wrapper',
      './assets/basket.svg'
    );
  }

  draw() {
    HeaderComponent();
    QueryParameters.check();
    FilteredProducts.filter();
    this.groupCategory.draw();
    this.groupBrand.draw();
    this.sliderPrice.draw();
    this.sliderStock.draw();
    this.sortBar.draw();
    this.productCard.draw();
    this.addListeneres();
  }

  private addListeneres() {
    const btnCopy = document.querySelector('.filter-btn__copy');
    if (btnCopy instanceof HTMLButtonElement) {
      btnCopy.addEventListener('click', () => {
        const copyInput = document.createElement('input');
        const text = window.location.href;
        document.body.appendChild(copyInput);
        copyInput.value = text;
        copyInput.select();
        document.execCommand('copy');
        document.body.removeChild(copyInput);

        btnCopy.classList.add('btn_active');
        setTimeout(() => {
          btnCopy.classList.remove('btn_active');
        }, 3000);
      });
    }

    const btnRest = document.querySelector('.filter-btn__rest');
    if (btnRest instanceof HTMLButtonElement) {
      btnRest.addEventListener('click', () => {
        QueryParameters.rest();
      });
    }
  }
}
