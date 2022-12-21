import productData from '../../products/productsData';
import { CreateNodeI, getElement } from '../general/general';

export interface ProductCardI extends CreateNodeI {
  pathImgCart: string;
}

export class ProductCard implements ProductCardI {
  readonly parentClass: string;
  readonly pathImgCart: string;
  private _length: number;

  constructor(parentClass: string, pathImgCart: string) {
    this.parentClass = parentClass;
    this.pathImgCart = pathImgCart;
    this._length = 0;
  }

  draw() {
    const nodeParent = getElement(this.parentClass);
    const card = this.createCard();

    productData.products.forEach(product => {
      const cardNode = card.cloneNode(true) as HTMLDivElement;
      cardNode.children[0].textContent = product.title;
      const img = cardNode.children[1] as HTMLImageElement;
      img.src = product.thumbnail;
      img.alt = product.title;
      const info = cardNode.children[2].children[0];
      for (let i = 0; i < info.children.length; i += 1) {
        let span = info.children[i].children[1] as HTMLSpanElement;
        let nameGroups = span.dataset.nameGroup;
        if (nameGroups !== undefined) {
          span.textContent = product[nameGroups] + ((nameGroups === 'discountPercentage') ? '%' : '');
        }
      }
      cardNode.children[2].children[1].children[0].textContent = `${product.price} $`;
      nodeParent.append(cardNode);
      this._length += 1;
    })
  }

  createCard(): HTMLDivElement {
    const wrapperCard = document.createElement('div');
    wrapperCard.classList.add('product-card');

    const title = this.createSpan('product-card__title');
    const productImg = document.createElement('img');
    productImg.classList.add('product-card__img');

    const productInfo = this.createInfo();

    const cardBuy = document.createElement('div');
    cardBuy.classList.add('product-card__buy');
    cardBuy.append(this.createSpan('product-card__price'));

    const btnCart = document.createElement('button');
    btnCart.classList.add('btn_default', 'product-card__btn-cart');

    const imgCart = document.createElement('img');
    imgCart.classList.add('product-card__img-cart');
    imgCart.src = this.pathImgCart;
    //imgCart.src = '../../img/cart2.svg';
    btnCart.append(imgCart);
    cardBuy.append(btnCart);

    const infoBuyWrapper = document.createElement('div');
    infoBuyWrapper.append(productInfo);
    infoBuyWrapper.append(cardBuy);

    wrapperCard.append(title);
    wrapperCard.append(productImg);
    wrapperCard.append(infoBuyWrapper);
    return wrapperCard;
  }

  private createInfo(): HTMLDivElement {
    const productInfo = document.createElement('div');
    productInfo.classList.add('product-card__info-wrapper');

    /*productInfo.append(this.createItemInfo('product-card__category', 'Category: ', 'category'));
    productInfo.append(this.createItemInfo('product-card__brand', 'Brand: ', 'brand'));
    productInfo.append(this.createItemInfo('product-card__discount', 'Discount: ', 'discountPercentage'));
    productInfo.append(this.createItemInfo('product-card__rating', 'Rating: ', 'rating'));
    productInfo.append(this.createItemInfo('product-card__stock', 'Stock: ', 'stock'));*/

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

  public get length(): number {
    return this._length;
  }

  private createSpan(className: string): HTMLSpanElement {
    const span = document.createElement('span')
    span.classList.add(className);
    return span;
  }
}

