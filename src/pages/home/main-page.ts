import { FilterGroup, FildeGroup } from '../../conponents/filter-group/FilterGroup';
import { FilterGroupSlider } from '../../conponents/filter-group/FilterGroupSlider';
import { SortBar } from '../../conponents/sort-bar/SortBar';
import { ProductCard } from '../../conponents/product-card/ProductCard';
import { QueryParameters, FilteredProducts } from '../../conponents/queryParameters/QueryParameters';
import { getElement } from '../../conponents/general/general';
import { Footer } from '../../conponents/footer/footer';
import HeaderComponent from '../../conponents/header/Header';
export class MainPage {
  groupCategory: FilterGroup;
  groupBrand: FilterGroup;
  sliderPrice: FilterGroupSlider;
  sliderStock: FilterGroupSlider;
  sortBar: SortBar;
  productCard: ProductCard;
  constructor() {
    this.groupCategory = new FilterGroup('.filters-wrapper__checkbox', FildeGroup.Category, 'filter-category');
    this.groupBrand = new FilterGroup('.filters-wrapper__checkbox', FildeGroup.Brand, 'filter-brand');
    this.sliderPrice = new FilterGroupSlider('.filters-wrapper__slider', FildeGroup.Price);
    this.sliderStock = new FilterGroupSlider('.filters-wrapper__slider', FildeGroup.Stock);
    this.sortBar = new SortBar('.products');
    this.productCard = new ProductCard('.products-card-wrapper', './assets/basket.svg');
  }

  async draw() {
    QueryParameters.check();
    FilteredProducts.filter();
    this.createPageBasis();
    this.groupCategory.draw();
    this.groupBrand.draw();
    this.sliderPrice.draw();
    this.sliderStock.draw();
    this.sortBar.draw();
    this.productCard.draw();
    this.addListeneres();
    Footer.parentClass = '';
    Footer.draw()
    
  }

  private createPageBasis() {
    const container = getElement('.body-container');
    const main = document.createElement('main');
    main.classList.add('main');
    const aside = document.createElement('aside');
    aside.classList.add('aside-container');

    const filtersWrapper = document.createElement('div');
    filtersWrapper.classList.add('filters-wrapper');

    const filterBtnWpapper = document.createElement('div');
    filterBtnWpapper.classList.add('filter-btn-wpapper');
    const btnRest = document.createElement('button');
    btnRest.textContent = 'Rest';
    btnRest.classList.add('filter-btn__rest', 'btn_default');
    const btnCopy = document.createElement('button');
    btnCopy.textContent = 'Copy';
    btnCopy.classList.add('filter-btn__copy', 'btn_default');
    filterBtnWpapper.append(btnRest);
    filterBtnWpapper.append(btnCopy);

    const checkbox = document.createElement('div');
    checkbox.classList.add('filters-wrapper__checkbox');
    const slider = document.createElement('div');
    slider.classList.add('filters-wrapper__slider');

    filtersWrapper.append(filterBtnWpapper);
    filtersWrapper.append(checkbox);
    filtersWrapper.append(slider);

    const sectionProducts = document.createElement('section');
    sectionProducts.classList.add('products');
    const productsWrapper = document.createElement('div');
    productsWrapper.classList.add('products-card-wrapper');
    sectionProducts.append(productsWrapper);

    aside.append(filtersWrapper);
    main.append(aside);
    main.append(sectionProducts);

    container.append(main);
  }
  
  private addListeneres() {
    const btnCopy = document.querySelector('.filter-btn__copy');
    if (btnCopy instanceof HTMLButtonElement) {
      btnCopy.addEventListener('click', () => {
        const copyInput = document.createElement('input'),
        text = window.location.href;
        document.body.appendChild(copyInput);
        copyInput.value = text;
        copyInput.select();
        document.execCommand('copy');
        document.body.removeChild(copyInput);

        btnCopy.classList.add('btn_active');
        setTimeout(() => {
          btnCopy.classList.remove('btn_active');
        }, 3000);
      })
    }

    const btnRest = document.querySelector('.filter-btn__rest');
    if (btnRest instanceof HTMLButtonElement) {
      btnRest.addEventListener('click', () => {
        QueryParameters.rest();
      })
    }
  }
}




