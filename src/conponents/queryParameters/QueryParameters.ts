import { productData, DataI } from '../../products/productsData';
import { AdditionalSettings } from '../general/general';

type QueryProperty = {
  big: string;
  brand?: string;
  category?: string;
  price_max?: string;
  price_min?: string;
  search?: string;
  sort?: string;
  stock_max?: string;
  stock_min?: string;
}
type StringNumber = string | number;

export class QueryParameters {

  static add(prop: string, value: string, multi = false): void {
    const urlParams = new URLSearchParams(document.location.search);
    if (urlParams.has(prop)) {
      const parameters = this.get(prop);
      if (!parameters) {
        throw new Error('Error getting query parameter.');
      }

      if (multi) {
        parameters.add(value);
        urlParams.set(prop, Array.from(parameters).join(';'));
      } else {
        urlParams.set(prop, value);
      }
    } else {
      urlParams.append(prop, value);
    }
    window.location.search = urlParams.toString();
  }

  static delete(prop: string, value?: string): void {
    const urlParams = new URLSearchParams(document.location.search);
    if (!urlParams.has(prop)) return;

    const parameters = this.get(prop);
    if (!parameters) {
      throw new Error('Error getting query parameter.');
    }
    if (value !== undefined) {
      parameters.delete(value);
    }
    if (parameters.size === 0 || value === undefined) {
      urlParams.delete(prop);
    } else {
      urlParams.set(prop, Array.from(parameters).join(';'));
    }
    window.location.search = urlParams.toString();
  }

  static get(prop: string): Set<string> | null {
    const urlParams = new URLSearchParams(document.location.search);
    const value = urlParams.get(prop);
    if (value === null) return null;
    return new Set(value.split(';'));
  }

  static check() {
    const queryString = window.location.search;
    if (queryString === '') {
      const urlParams = new URLSearchParams(queryString);
      urlParams.append('big', 'true');
      window.location.search = urlParams.toString();
    }
  }

  static rest() {
    window.location.hash = '';
    window.location.search = '';
  }

  static getAllParemeters():QueryProperty {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries()) as QueryProperty;
    return params;
  }
}

export class FilteredProducts {
  
  static result: DataI[] = [];
  static minPrice = 0;
  static maxPrice = 0;
  static minStock = 0;
  static maxStock = 0;

  static filter() {
    const parameters = QueryParameters.getAllParemeters();
    this.result = [];
    this.minPrice = productData.products[0].price;
    this.minStock = productData.products[0].stock;
    const curFilter = this.LastFilter;
    for (let i = 0; i < productData.products.length; i += 1) {
      const product = productData.products[i];
      if (parameters.price_min !== undefined && Number(parameters.price_min) > product.price) {
        continue;
      }

      if (parameters.price_max !== undefined && Number(parameters.price_max) < product.price) {
        continue;
      }

      if (parameters.stock_min !== undefined && Number(parameters.stock_min) > product.stock) {
        continue;
      }

      if (parameters.stock_max !== undefined && Number(parameters.stock_max) < product.stock) {
        continue;
      }

      if (parameters.brand !== undefined) {
        const brands = parameters.brand.split(';');
        if ( brands.findIndex(element => element === product.brand) === -1 ) {
          continue;
        }
      }

      if (parameters.category !== undefined) {
        const categories = parameters.category.split(';');
        if ( categories.findIndex(element => element === product.category) === -1 ) {
          continue;
        }
      }

      if (parameters.search !== undefined) {
        if ( !(this.includesValue(product.title, parameters.search) ||
        this.includesValue(product.description, parameters.search) || 
        this.includesValue(product.price, parameters.search) || 
        this.includesValue(product.discountPercentage, parameters.search) || 
        this.includesValue(product.rating, parameters.search) ||
        this.includesValue(product.stock, parameters.search) ||
        this.includesValue(product.brand, parameters.search) ||
        this.includesValue(product.category, parameters.search)) ) {
          continue;
        }
      }

      if (this.minPrice === -1) {
        this.minPrice = product.price;
        this.minStock = product.stock;
      }

      this.minPrice = (parameters.price_min !== undefined && curFilter === 'price') ? Number(parameters.price_min) : Math.min(this.minPrice, product.price);
      this.maxPrice = (parameters.price_max !== undefined && curFilter === 'price') ? Number(parameters.price_max) : Math.max(this.maxPrice, product.price);
      this.minStock = (parameters.stock_min !== undefined && curFilter === 'stock') ? Number(parameters.stock_min) : Math.min(this.minStock, product.stock);
      this.maxStock = (parameters.stock_max !== undefined && curFilter === 'stock') ? Number(parameters.stock_max) : Math.max(this.maxStock, product.stock);

      this.result.push(product);
    }

    if (this.result.length === productData.products.length) {
      this.minPrice = 0;
      this.minStock = 0;
    }

    if (parameters.sort !== undefined) {
      const sortParameters = parameters.sort.split('-');
      const directionASC = sortParameters[1].toString().toLowerCase() === 'asc';
      const groupName = sortParameters[0];
      if (groupName === 'rating' || groupName === 'price') {
        this.result.sort((a, b) => {
          if (directionASC) {
            return a[groupName] - b[groupName];
          } else {
            return b[groupName] - a[groupName];
          }
        })
      }
    }
  }
  
  static includesValue(value: StringNumber, searchValue: StringNumber): boolean {
    const str = value.toString().toLowerCase();
    const strSearchValue = searchValue.toString().toLowerCase();
    return str.indexOf(strSearchValue) >= 0;
  }

  static set LastFilter(value: string) {
    const settings = localStorage.getItem('additionalSettings');
    let objSettings: AdditionalSettings;
    if (settings !== null) {
      objSettings = JSON.parse(settings);
      objSettings.lastFilter = value;
    } else {
      objSettings = { lastFilter: value, pages: { previousProductsPage: 1, currentProductsPage: 1 } };
    }
    localStorage.setItem('additionalSettings', JSON.stringify(objSettings));
  }

  static get LastFilter():string {
    const settings = localStorage.getItem('additionalSettings');
    let objSettings: AdditionalSettings;
    if (settings !== null) {
      objSettings = JSON.parse(settings);
      return objSettings.lastFilter;
    }
    return '';
  }
}