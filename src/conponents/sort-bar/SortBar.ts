import { CreateNodeI, getElement } from '../general/general';
import productData from '../../products/productsData';

type SortOption = {
  property: 'price' | 'rating',
  direction: 'ASC' | 'DESC',
}

export interface SortBarI extends CreateNodeI {
  parentClass: string;
  get amountFound(): number;
  set amountFound(value: number);
}

export class SortBar implements SortBarI {
  readonly parentClass: string;
  _amountFound: number;

  constructor(parentClass: string) {
    this.parentClass = parentClass;
    this._amountFound = productData.products.length;
  }

  draw() {
    const nodeParent = getElement(this.parentClass);
    const wrapper = document.createElement('div');
    const wrapperSortAndSearch = document.createElement('div');
    wrapperSortAndSearch.classList.add('sort-wrapper-first');
    const wrapperAmountView = document.createElement('div');
    wrapperAmountView.classList.add('sort-wrapper-second');
    wrapper.classList.add('products-sort');
    const selectBar = this.createSelectBar();
    const amount = document.createElement('span');
    amount.classList.add('amount-found');
    this.renderAmountFound();
    const searchBar = this.createSearchBar();
    const viewMode = this.createViewMode();
    wrapperSortAndSearch.append(selectBar);
    wrapperSortAndSearch.append(searchBar);
    wrapper.append(wrapperSortAndSearch);
    wrapperAmountView.append(amount);
    wrapperAmountView.append(viewMode);
    wrapper.append(wrapperAmountView);
    nodeParent.prepend(wrapper);
  }

  renderAmountFound() {
    setTimeout(() => {
      const amount = getElement('.amount-found');
      amount.textContent = `Found: ${this.amountFound}`;
    }, 0);
  }

  private createViewMode(): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.classList.add('view-mode');

    const small = document.createElement('div');
    small.classList.add('view-mode__item', 'view-mode__item_small');

    const big = document.createElement('div');
    big.classList.add('view-mode__item', 'view-mode__item_big');

    wrapper.append(small);
    wrapper.append(big);
    return wrapper;
  }

  private createSearchBar(): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.classList.add('search-bar');

    const input = document.createElement('input');
    input.classList.add('search-bar__input');
    input.type = 'search';
    input.placeholder = 'Search product';
    input.autocomplete = 'off';
    input.autofocus = true;

    wrapper.append(input);
    return wrapper;
  }

  private createSelectBar(): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.classList.add('select-wrapper');

    const select = document.createElement('select');
    select.classList.add('sort-bar__select');

    const nodeOption = document.createElement('option');
    nodeOption.classList.add('sort__item');
    const optionTitle = nodeOption.cloneNode(true) as HTMLOptionElement;
    optionTitle.selected = true;
    optionTitle.disabled = true;
    optionTitle.textContent = 'Sort options';

    select.append(optionTitle);
    wrapper.append(select);

    const sortArr: SortOption[] = [{property: 'price', direction: 'ASC'},
    {property: 'price', direction: 'DESC'},
    {property: 'rating', direction: 'ASC'},
    {property: 'rating', direction: 'DESC'}]
    
    sortArr.forEach(sort => {
      const option = nodeOption.cloneNode(true) as HTMLOptionElement;
      option.setAttribute('data-sort', JSON.stringify(sort));
      option.textContent = `Sort by ${sort.property} ${sort.direction}`;
      select.append(option);
    })

    return wrapper;
  }

  get amountFound(): number {
    return this._amountFound;
  }

  set amountFound(value: number) {
    if (value >= 0) {
      this._amountFound = value;
    }
  }

}