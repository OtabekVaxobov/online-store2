import './index.html';
import './index.css';
import productData from './products/productsData';
import headerComponent from './commponets/header';
const arr = productData.products;

const body = document.body;

body.innerHTML = headerComponent();