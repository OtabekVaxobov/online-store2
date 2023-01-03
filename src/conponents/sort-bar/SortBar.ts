import { CreateNodeI, getElement } from '../general/general';
import { productData } from '../../products/productsData';
import { QueryParameters, FilteredProducts } from '../queryParameters/QueryParameters';

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

    viewMode.addEventListener('click', (event) => {
      const target = event.target;
      if ( !(target instanceof HTMLDivElement) ) return;
      QueryParameters.add('big', String(target.dataset.viewMode === 'big'))
    })

    selectBar.addEventListener('change', (event) => {
      const target = event.target;
      if ( !(target instanceof HTMLSelectElement) ) return;
      const sortOptionStr = target.options[target.selectedIndex].dataset.sort;
      if (sortOptionStr !== undefined) {
        const sortOption: SortOption = JSON.parse(sortOptionStr);
        QueryParameters.add('sort', `${sortOption.property}-${sortOption.direction}`);
      }
    })
  }

  renderAmountFound() {
    setTimeout(() => {
      const amount = getElement('.amount-found');
      amount.textContent = `Found: ${FilteredProducts.result.length}`;
    }, 0);
  }

  private createViewMode(): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.classList.add('view-mode');

    const small = document.createElement('div');
    small.classList.add('view-mode__item', 'view-mode__item_small');
    small.setAttribute('data-view-mode', 'small');

    const big = document.createElement('div');
    big.classList.add('view-mode__item', 'view-mode__item_big');
    big.setAttribute('data-view-mode', 'big');

    const param = QueryParameters.get('big');
    if (param) {
      const bigMode = param.values().next().value === 'true';
      if (bigMode) {
        big.classList.add('view-mode__item_active');
        small.classList.remove('view-mode__item_active');
      } else {
        small.classList.add('view-mode__item_active');
        big.classList.remove('view-mode__item_active');
      }
    }

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
    const param = QueryParameters.get('search');
    if (param) {
      input.value = param.values().next().value;
    } else {
      input.value = '';
    }

    input.addEventListener('input', (event) => {
      const target = event.target;
      if ( !(target instanceof HTMLInputElement) ) return;
      if (target.value === '') {
        QueryParameters.delete('search');
      } else {
        QueryParameters.add('search', target.value);
      }
    })

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
    
    const param = QueryParameters.get('sort');
    let querySort = '';
    if (param !== null) {
      querySort = String(param.values().next().value);
    }

    sortArr.forEach(sort => {
      const option = nodeOption.cloneNode(true) as HTMLOptionElement;
      const sortStr = JSON.stringify(sort);
      option.setAttribute('data-sort', sortStr);
      if (`${sort.property}-${sort.direction}` === querySort) {
        option.selected = true;
      }
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
      this.renderAmountFound();
    }
  }

}