import { DataI, productData } from '../../products/productsData';
import { CreateNodeI, getElement } from '../general/general';
import { FilteredProducts, QueryParameters } from '../queryParameters/QueryParameters';
//import { handlerLocation } from '../../../src/index';
import { Route } from '../routes//Routes';

export interface ProductCardI extends CreateNodeI {
  pathImgCart: string;
}

export class ProductCard implements ProductCardI {
  readonly parentClass: string;
  readonly pathImgCart: string;
  showInfo: boolean;

  constructor(parentClass: string, pathImgCart: string) {
    this.parentClass = parentClass;
    this.pathImgCart = pathImgCart;
    this.showInfo = true;
  }

  draw(): void {
    const nodeParent = getElement(this.parentClass);

    if (FilteredProducts.result.length === 0) {
      const title = document.createElement('div');
      title.classList.add('massage-info');
      title.textContent = 'No products found';
      nodeParent.append(title);
      return;
    }

    const param = QueryParameters.get('big');
    if (param) {
      this.showInfo = param.values().next().value === 'true';
    }

    const card = this.createCard();
    FilteredProducts.result.forEach(product => {
      setTimeout(() => {
        this.renderCard(nodeParent, card, product);
      }, 0);
    })

    this.addListeners();
  }

  private async setImg(url: string, img: HTMLImageElement) {
    let response = await fetch(url);
    if (response.ok) {
      const blob = await response.blob();
      img.src = URL.createObjectURL(blob);
    } else {
      setTimeout(async () => {
        response = await fetch(url);
        const blob = await response.blob();
        img.src = URL.createObjectURL(blob);
      }, 5000);
    }
  }

  private renderCard(nodeParent: Element, card: HTMLDivElement, product: DataI) {
    const cardNode = card.cloneNode(true) as HTMLDivElement;
    cardNode.setAttribute('data-card-id', String(product.id));
    cardNode.children[0].textContent = product.title;
    cardNode.children[0].setAttribute('title', product.title);
    const img = cardNode.children[1] as HTMLImageElement;
    //img.src = product.thumbnail;
    this.setImg(product.thumbnail, img);
    img.alt = product.title;
    img.loading = 'lazy';
    const info = cardNode.children[2].children[0];
    
    if (this.showInfo) {
      for (let i = 0; i < info.children.length; i += 1) {
        const span = info.children[i].children[1] as HTMLSpanElement;
        const nameGroups = span.dataset.nameGroup;
        if (nameGroups !== undefined) {
          span.textContent = product[nameGroups] + ((nameGroups === 'discountPercentage') ? '%' : '');
          if (nameGroups === 'brand') {
            span.setAttribute('title', product[nameGroups]);
          }
        }
      }
    }

    const childIndex = (this.showInfo) ? 1 : 0;
    cardNode.children[2].children[childIndex].children[0].textContent = `${product.price} $`;
    nodeParent.append(cardNode);
  }

  createCard(): HTMLDivElement {
    const wrapperCard = document.createElement('div');
    wrapperCard.classList.add('product-card');
    if (!this.showInfo) {
      wrapperCard.classList.add('product-card__small');
    }

    const title = this.createSpan('product-card__title');
    const productImg = document.createElement('img');
    productImg.classList.add('product-card__img');

    const cardBuy = document.createElement('div');
    cardBuy.classList.add('product-card__buy');
    cardBuy.append(this.createSpan('product-card__price'));

    const btnCart = document.createElement('button');
    btnCart.classList.add('btn_default', 'product-card__btn-cart');

    const imgCart = document.createElement('img');
    imgCart.classList.add('product-card__img-cart');
    imgCart.src = this.pathImgCart;
    btnCart.append(imgCart);
    cardBuy.append(btnCart);

    const infoBuyWrapper = document.createElement('div');
    if (this.showInfo) {
      const productInfo = this.createInfo();
      infoBuyWrapper.append(productInfo);
    }
    
    infoBuyWrapper.append(cardBuy);

    wrapperCard.append(title);
    wrapperCard.append(productImg);
    wrapperCard.append(infoBuyWrapper);
    return wrapperCard;
  }

  private createInfo(): HTMLDivElement {
    const productInfo = document.createElement('div');
    productInfo.classList.add('product-card__info-wrapper');

    productInfo.append(this.createItemInfo('Category: ', 'category'));
    productInfo.append(this.createItemInfo('Brand: ', 'brand'));
    productInfo.append(this.createItemInfo('Discount: ', 'discountPercentage'));
    productInfo.append(this.createItemInfo('Rating: ', 'rating'));
    productInfo.append(this.createItemInfo('Stock: ', 'stock'));

    return productInfo;
  }

  private createItemInfo(nameGroupTitle: string, nameGroup: string): HTMLDivElement {
    const infoWrapper = document.createElement('div');
    infoWrapper.classList.add('product-card__info-item');
    const nameGroupSpan = this.createSpan('product-card__name-group');
    nameGroupSpan.textContent = nameGroupTitle;
    const groupValue = this.createSpan('product-card__title-group');
    groupValue.setAttribute('data-name-group', nameGroup);

    infoWrapper.append(nameGroupSpan);
    infoWrapper.append(groupValue);
    return infoWrapper;
  }

  private createSpan(className: string): HTMLSpanElement {
    const span = document.createElement('span')
    span.classList.add(className);
    return span;
  }

  private async addListeners(): Promise<void> {
    const nodeParent = getElement(this.parentClass);
    nodeParent.addEventListener('click', (event) => {
      const target = event.target;
      if (! (target instanceof HTMLElement) ) return;
      const productCard = target.closest(".product-card");
      if (! (productCard instanceof HTMLElement) ) return;
      //window.location.hash = `/product-details/${productCard.dataset.cardId}`;
      //window.location.search = '';
      window.history.pushState({}, '', `/product-details/${productCard.dataset.cardId}`)
      //window.location.hash = `/product-details/${productCard.dataset.cardId}`;
      //handlerLocation();
      Route.handlerLocation();
    })
  }

}

