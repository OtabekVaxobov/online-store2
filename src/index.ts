import './index.html';
import './index.css';
import productData from './products/productsData';


const arr = productData.products;
arr.forEach(value => {
  console.log(value.price);
})