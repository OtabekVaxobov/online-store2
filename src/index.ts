import './index.html';
import './index.css';
import { MainPage } from './pages/home/main-page';
import  HeaderComponent  from "./components/header/header";
const mainPage = new MainPage();
mainPage.draw();

HeaderComponent(document.querySelectorAll('.product-card'))

// import productData from './products/productsData';
// import headerComponent from './commponets/header';
// const arr = productData.products;

// const body = document.body;

// body.innerHTML = headerComponent();

