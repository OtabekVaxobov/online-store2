import { CreateNodeI, getElement } from '../../conponents/general/general';
import { DataI, productData } from '../../products/productsData';

export interface ProducDetailsI extends CreateNodeI {
  productId: number;
}

export class ProducDetails implements ProducDetailsI {
  parentClass: string;
  productId: number;
  constructor(parentClass: string, productId: number) {
    this.parentClass = parentClass;
    this.productId = productId;
  }

  draw() {
    const product = productData.products.find((el) => el.id === this.productId);
    if (!product) {
      throw new Error('Item not found by id.');
    }
    const parent = getElement(this.parentClass);
    const productWrapper = document.createElement('div');
    productWrapper.classList.add('product-details-wrapper');
    const nav = this.createNav(product);
    const card = this.createInfoCard(product);
    productWrapper.append(nav);
    productWrapper.append(card);
    parent.append(productWrapper);

    this.addListeners();
  }

  private createNav(product: DataI): HTMLElement {
    const nav = document.createElement('nav');
    nav.classList.add('details-nav', 'nav');
    const ul = document.createElement('ul');
    ul.classList.add('nav-ul');

    const liStore = document.createElement('li');
    liStore.classList.add('nav-links__item');
    const linkStore = document.createElement('a');
    linkStore.classList.add('nav__link', 'nav__link_store');
    linkStore.href = '/';
    linkStore.textContent = 'Store';
    liStore.append(linkStore);

    const liCategory = document.createElement('li');
    liCategory.classList.add('nav-links__item');
    const linkCategory = document.createElement('a');
    linkCategory.classList.add('nav__link');
    linkCategory.href = '#';
    linkCategory.textContent = product.category;
    liCategory.append(linkCategory);

    const liBrand = document.createElement('li');
    liBrand.classList.add('nav-links__item');
    const linkBrand = document.createElement('a');
    linkBrand.classList.add('nav__link');
    linkBrand.href = '#';
    linkBrand.textContent = product.brand;
    liBrand.append(linkBrand);

    const liProductName = document.createElement('li');
    liProductName.classList.add('nav-links__item');
    const linkProductName = document.createElement('a');
    linkProductName.classList.add('nav__link');
    linkProductName.href = '#';
    linkProductName.textContent = product.title;
    liProductName.append(linkProductName);

    const arrow = document.createElement('span');
    arrow.textContent = '>>';

    ul.append(liStore);
    ul.append(arrow.cloneNode(true));
    ul.append(liCategory);
    ul.append(arrow.cloneNode(true));
    ul.append(liBrand);
    ul.append(arrow.cloneNode(true));
    ul.append(liProductName);
    nav.append(ul);
    return nav;
  }

  private createInfoCard(product: DataI): HTMLDivElement {
    const detailsCard = document.createElement('div');
    detailsCard.classList.add('details-card');
    const cardTitle = document.createElement('div');
    cardTitle.classList.add('details-card-title');
    cardTitle.textContent = product.title;
    const infoCard = document.createElement('div');
    infoCard.classList.add('details-card-info');
    const images = this.createPicturesSection(product);
    const information = this.createInformationSection(product);
    const buy = this.createBuySection(product.price)
    infoCard.append(images);
    infoCard.append(information);
    infoCard.append(buy);

    detailsCard.append(cardTitle);
    detailsCard.append(infoCard);
    return detailsCard;
  }

  private createPicturesSection(product: DataI): HTMLDivElement {
    const images = document.createElement('div');
    images.classList.add('product-images');
    const currentImgWrapper = document.createElement('div');
    currentImgWrapper.classList.add('current-img-wrapper');
    const currentImg = document.createElement('img');
    currentImg.classList.add('product-images__current-img');
    currentImg.src = product.images[0];
    currentImgWrapper.append(currentImg);

    const gallery = document.createElement('div');
    gallery.classList.add('product-images-gallery');

    for (let i = 0; i < product.images.length; i += 1) {
      const galleryItem = document.createElement('div');
      galleryItem.classList.add('img-wrapper');
      const galleryImg= document.createElement('img');
      galleryImg.classList.add('product-images-gallery__item');
      galleryImg.src = product.images[i];
      galleryItem.append(galleryImg);
      gallery.append(galleryItem);
    }

    images.append(currentImgWrapper);
    images.append(gallery);
    return images;
  }

  private createInformationSection(product: DataI): HTMLDivElement {
    const infoWrapper = document.createElement('div');
    infoWrapper.classList.add('details-card-information', 'information');

    type InfoItem = {
      title: string;
      key: string;
    }
    const arr: [InfoItem, InfoItem, InfoItem, InfoItem, InfoItem, InfoItem] = 
    [{ title: 'Description', key: 'description'},
    { title: 'Category', key: 'category'},
    { title: 'Brand', key: 'brand'},
    { title: 'Rating', key: 'rating'},
    { title: 'Discount', key: 'discountPercentage'},
    { title: 'Stock', key: 'stock'}];

    arr.forEach((group) => {

      const informationItem = document.createElement('div');
      informationItem.classList.add('information__item');
      if (group.key === 'description') {
        informationItem.classList.add('information-description');
      }

      const informationTitle = document.createElement('div');
      informationTitle.classList.add('information__title');
      informationTitle.textContent = group.title;

      const informationValue = document.createElement('div');
      informationValue.classList.add('information__value');
      const value = product[group.key];
      informationValue.textContent = (group.key === 'discountPercentage') ? `${String(value)}%` : String(value);
      informationItem.append(informationTitle);
      informationItem.append(informationValue);
      infoWrapper.append(informationItem);
    })

    return infoWrapper;
  }

  private createBuySection(amount: number): HTMLDivElement {
    const buy = document.createElement('div');
    buy.classList.add('details-card-btns');
    const bntWrapper = document.createElement('div');
    bntWrapper.classList.add('card-btns-wrapper');
    const amountSpan = document.createElement('span');
    amountSpan.classList.add('details-card__amount');
    amountSpan.textContent = `${String(amount)} $`;

    const bntCart = document.createElement('button');
    bntCart.classList.add('details-card__btn-cart', 'btn_default');
    bntCart.textContent = 'ADD TO CART';

    const bntBuy = document.createElement('button');
    bntBuy.classList.add('details-card__btn-buy', 'btn_default');
    bntBuy.textContent = 'BUY NOW';

    bntWrapper.append(amountSpan);
    bntWrapper.append(bntCart);
    bntWrapper.append(bntBuy);
    buy.append(bntWrapper);

    return buy;
  }

  private async addListeners(): Promise<void> {
    const gallery = await getElement('.product-images-gallery');
    const currentImg = await getElement('.product-images__current-img');
    if ( !(currentImg instanceof HTMLImageElement) ) return;

    gallery.addEventListener('click', (event) => {
      const target = event.target;
      if ( !(target instanceof HTMLImageElement) ) return;
      currentImg.src = target.src;
    })
  }

}