import './index.html';
import './index.css';
import { DualSlider } from './conponents/dual-slider/DualSlider';
import productData from './products/productsData';

const sliderPrice = new DualSlider('.dual-slider__price', 'price');
sliderPrice.draw();

const sliderStock = new DualSlider('.dual-slider__stock', 'stock');
sliderStock.draw();