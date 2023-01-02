import './index.html';
import './index.css';

import { Route } from '../src/conponents/routes/Routes';
//localStorage.clear()
Route.start();

/*import { MainPage } from './pages/home/main-page';
import { ProducDetails } from './pages/product-details/product-details-page';
import { getElement } from './conponents/general/general';

const mainPage = new MainPage();
const product = new ProducDetails('.body-container', 10);

type DrawFunction = (additionParam?: number) => void;
type RoutesTemplates = {[key: string]: DrawFunction};

let routes: RoutesTemplates = {
  '/': () => {
    clear();
    mainPage.draw();
  },
  '/product-details': (additionParam?: number) => {
    clear();
    if (additionParam) {
      product.productId = additionParam;
    }
    product.draw();
  },
  '/404': () => {},
};

function clear(): void {
  const container = getElement('.body-container');
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

export const handlerLocation = async() => {
  let path = window.location.pathname;
  let additionParam = null;
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
  const route = routes[path] || routes['/404'];
  if (additionParam !== null) {
    route(additionParam);
  } else {
    route();
  }
}

window.addEventListener('load', handlerLocation);
window.addEventListener('hashchange', handlerLocation);
window.addEventListener('popstate', handlerLocation);*/
