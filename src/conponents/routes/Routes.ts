import { MainPage } from '../../pages/home/main-page';
import { ProducDetails } from '../../pages/product-details/product-details-page';
import { getElement } from '../general/general';

const mainPage = new MainPage();
const product = new ProducDetails('.body-container', 1);

type DrawFunction = (additionParam?: number) => void;
type RoutesTemplates = {[key: string]: DrawFunction};

export class Route {

  static routes: RoutesTemplates = {
    '/': () => {
      Route.clear();
      mainPage.draw();
    },
    '/product-details': (additionParam?: number) => {
      Route.clear();
      if (additionParam) {
        product.productId = additionParam;
      }
      product.draw();
    },
    '/404': () => {},
  };

  static handlerLocation = async() => {
    let path = window.location.pathname;
    let additionParam: null | number = null;
    if (path !== '/') {
      const partsStr = path.split('/');
      path = `/${partsStr[1]}`;
      if (partsStr.length > 2) {
        if (!!Number(partsStr[2])) {
          additionParam = Number(partsStr[2]);
          if ( typeof additionParam !== 'number') {
            additionParam = null;
          }
        }
      }
    } else {
      path = '/';
    }
    const route = Route.routes[path] || Route.routes['/404'];
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
    }
  }

  static start(): void {
    window.addEventListener('load', Route.handlerLocation);
    window.addEventListener('hashchange', Route.handlerLocation);
    window.addEventListener('popstate', Route.handlerLocation);
  }
}
