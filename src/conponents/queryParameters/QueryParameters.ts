import { productData, DataI } from '../../products/productsData';

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

type AdditionalSettings = {
  lastFilter: string;
}

type StringNumber = string | number;

export class QueryParameters {

  static add(prop: string, value: string, multi:boolean = false): void {
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
    if (!value) return null;
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
  static minPrice: number = 0;
  static maxPrice: number = 0;
  static minStock: number = 0;
  static maxStock: number = 0;

  static filter() {
    const parameters = QueryParameters.getAllParemeters();
    this.minPrice = productData.products[0].price;
    this.minStock = productData.products[0].stock;
    const curFilter = this.LastFilter;
    for (let i = 0; i < productData.products.length; i += 1) {
      const product = productData.products[i];
      if (parameters.price_min && Number(parameters.price_min) > product.price) {
        continue;
      }

      if (parameters.price_max && Number(parameters.price_max) < product.price) {
        continue;
      }

      if (parameters.stock_min && Number(parameters.stock_min) > product.stock) {
        continue;
      }

      if (parameters.stock_max && Number(parameters.stock_max) < product.stock) {
        continue;
      }

      if (parameters.brand) {
        const brands = parameters.brand.split(';');
        if ( brands.findIndex(element => element === product.brand) === -1 ) {
          continue;
        }
      }

      if (parameters.category) {
        const categories = parameters.category.split(';');
        if ( categories.findIndex(element => element === product.category) === -1 ) {
          continue;
        }
      }

      if (parameters.search) {
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

      this.minPrice = (parameters.price_min && curFilter === 'price') ? Number(parameters.price_min) : Math.min(this.minPrice, product.price);
      this.maxPrice = (parameters.price_max && curFilter === 'price') ? Number(parameters.price_max) : Math.max(this.maxPrice, product.price);
      this.minStock = (parameters.stock_min && curFilter === 'stock') ? Number(parameters.stock_min) : Math.min(this.minStock, product.stock);
      this.maxStock = (parameters.stock_max && curFilter === 'stock') ? Number(parameters.stock_max) : Math.max(this.maxStock, product.stock);

      this.result.push(product);
    }

    if (this.result.length === productData.products.length) {
      this.minPrice = 0;
      this.minStock = 0;
    }

    if (parameters.sort) {
      const sortParameters = parameters.sort.split('-');
      const directionASC = sortParameters[1].toString().toLowerCase() === 'asc';
      const groupName = sortParameters[0];
      this.result.sort((a, b) => {
        if (directionASC) {
          return a[groupName] - b[groupName];
        } else {
          return b[groupName] - a[groupName];
        }
      })
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
    if (settings) {
      objSettings = JSON.parse(settings);
      objSettings.lastFilter = value;
    } else {
      objSettings = { lastFilter: value };
    }
    localStorage.setItem('additionalSettings', JSON.stringify(objSettings));
  }

  static get LastFilter():string {
    const settings = localStorage.getItem('additionalSettings');
    let objSettings: AdditionalSettings;
    if (settings) {
      objSettings = JSON.parse(settings);
      return objSettings.lastFilter;
    }
    return '';
  }
}