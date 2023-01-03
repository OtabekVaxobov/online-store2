import { getElement, AdditionalSettings, ProductsPage } from '../general/general';
import { FilteredProducts } from '../queryParameters/QueryParameters';

export class ProductPages {
  static readonly maxProductsPerPage = 15;
  static parentClass = '';

  static renderPages(): void {
    const nodeParent = getElement('.products-pages');
    nodeParent.children[ProductPages.previousProductsPage - 1].classList.remove('products-pages__item-activ');
    nodeParent.children[ProductPages.currentProductsPage - 1].classList.add('products-pages__item-activ');
  }

  static set currentProductsPage(value: number) {
    const previousProductsPage = ProductPages.currentProductsPage;
    const settingsPage: ProductsPage = {
      previousProductsPage: previousProductsPage,
      currentProductsPage: value,
    };
    
    const settings = localStorage.getItem('additionalSettings');
    if (settings !== null) {
      const additionalSettings: AdditionalSettings = JSON.parse(settings);
      additionalSettings.pages = settingsPage;
      localStorage.setItem('additionalSettings', JSON.stringify(additionalSettings));
    } else {
      ProductPages.setDefaultAdditionSettings();
    }
  }

  static get currentProductsPage(): number {
    const numberPages = Math.ceil(FilteredProducts.result.length / ProductPages.maxProductsPerPage);
    const settings = localStorage.getItem('additionalSettings');
    if (settings !== null) {
      const additionalSettings: AdditionalSettings = JSON.parse(settings);
      if (additionalSettings.pages !== undefined) {
        const settingsObj = additionalSettings.pages;
        const currentProductsPage = Math.min(settingsObj.currentProductsPage, numberPages);
        if (currentProductsPage !== settingsObj.currentProductsPage) {
          console.log(currentProductsPage, settingsObj)
          settingsObj.currentProductsPage = currentProductsPage;
          settingsObj.previousProductsPage = currentProductsPage;
          additionalSettings.pages = settingsObj;
          localStorage.setItem('additionalSettings', JSON.stringify(additionalSettings));
        }
        return currentProductsPage;
      }
    } else {
      ProductPages.setDefaultAdditionSettings();
    }
    return 1;
  }

  static get previousProductsPage(): number {
    const settings = localStorage.getItem('additionalSettings');
    if (settings !== null) {
      const additionalSettings: AdditionalSettings = JSON.parse(settings);
      if (additionalSettings.pages !== undefined) {
        const settingsObj = additionalSettings.pages;
        return settingsObj.previousProductsPage;
      }
    } else {
      ProductPages.setDefaultAdditionSettings();
    }
    return 1;
  }

  static setDefaultAdditionSettings() {
    const settingsPage: ProductsPage = {
      previousProductsPage: 1,
      currentProductsPage: 1
    };

    const additionalSettings: AdditionalSettings = {
      pages: settingsPage,
      lastFilter: '',
    }
    localStorage.setItem('additionalSettings', JSON.stringify(additionalSettings));
  }

}