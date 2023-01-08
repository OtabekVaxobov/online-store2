import { MainPage } from '../../pages/home/main-page';
import { ProducDetails } from '../../pages/product-details/product-details-page';
import { Page404 } from '../../pages/page-404/page-404';
import { getElement } from '../general/general';
import HeaderComponent from '../header/Header'
import CartPage from '../../pages/cart-page/cart-page'
const mainPage = new MainPage();
const product = new ProducDetails('.body-container', 1);

export enum Routes { 
  Home = '/', 
  Details = '/product-details',
  Page404 = '/404',
  Cart = '/cart',
}

type DrawFunction = (additionParam?: number) => void;
type RoutesTemplates = {[key in Routes]: DrawFunction};

export class Route {

  static routes: RoutesTemplates = {
    '/': () => {
      Route.clear();
      mainPage.draw();
      HeaderComponent();
    },
    '/product-details': (additionParam?: number) => {
      Route.clear();
      if (additionParam !== undefined) {
        product.productId = additionParam;
      }
      product.draw();
      HeaderComponent();
    },
    '/404': () => {
      Route.clear();
      const page404 = new Page404('.body-container');
      page404.draw();
    },
    '/cart': () => {
      Route.clear();
      HeaderComponent();
      CartPage();
    },
  };

  static getRoute(path: string) {
    let route: DrawFunction;
    if (Routes.Home === path) {
      route = Route.routes[Routes.Home];
    } else if (Routes.Details === path) {
      route = Route.routes[Routes.Details];
    } else if (Routes.Cart === path) {
      route = Route.routes[Routes.Cart];
    } else {
      route = Route.routes[Routes.Page404];
    }
    return route;
  }

  static handlerLocation = async() => {
    let path = window.location.hash;
    let additionParam: null | number = null;
    if (path !== '') {
      const partsStr = path.split('/');
      path = `/${partsStr[1]}`;
      if (partsStr.length > 2) {
        if (partsStr[2] !== undefined) {
          additionParam = Number(partsStr[2]);
          if ( typeof additionParam !== 'number') {
            additionParam = null;
          }
        }
      }
    } else {
      path = '/';
    }

    const route = Route.getRoute(path);
    if (additionParam !== null) {
      route(additionParam);
    } else {
      route();
    }
  }

  static clear(): void {
    const container = getElement('.body-container');
    while (container.firstChild) {
      container.removeChild(container.firstChild);
      setTimeout(() => {
        document.querySelector('header')?.remove()
      }, 0);
    }
  }

  static start(): void {
    window.addEventListener('load', Route.handlerLocation);
    window.addEventListener('hashchange', Route.handlerLocation);
    window.addEventListener('popstate', Route.handlerLocation);
  }
}
