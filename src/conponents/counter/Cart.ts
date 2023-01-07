import { productData } from '../../products/productsData';
const CART_NAME_LS = 'cart';

type ProductCart = {
  id: number;
  count: number;
}

type StorageCart = {
  products: ProductCart[];
}

export class Cart {
  static add(id: number): void {
    const cart = getCart();
    const productInd = cart.products.findIndex((el) => el.id === id);
    if (productInd >= 0) {
      cart.products[productInd].count +=1;
    } else {
      cart.products.push({
        id: id,
        count: 1
      })
    }
    setCart(cart);
  }

  static delete(id: number): void {
    const cart = getCart();
    const productInd = cart.products.findIndex((el) => el.id === id);
    if (productInd >= 0) {
      cart.products.splice(productInd, 1);
    }
    setCart(cart);
  }

  static getTotalCount(): number {
    const cart = getCart();
    return cart.products.reduce((acc, cur) => acc += cur.count, 0);
  }

  static getTotalCost(): number {
    const cart = getCart();
    return cart.products.reduce((acc, cur) => {
      const product = productData.products.find((el) => el.id === cur.id);
      if (!product) {
        throw new Error('Item not found in cart');
      }
      acc += product.price * cur.count;
      return acc;
    }, 0);
  }

  static contains(id: number): boolean {
    const cart = getCart();
    return cart.products.findIndex((el) => el.id === id) > -1;
  }
}

function getCart(): StorageCart {
  const cart = localStorage.getItem(CART_NAME_LS);
  let productCart: StorageCart;
  if (cart === null) {
    productCart = {
      products: [],
    }
    return productCart;
  }
  productCart = JSON.parse(cart);
  return productCart;
}

function setCart(cart: StorageCart) {
  localStorage.setItem(CART_NAME_LS, JSON.stringify(cart));
}
