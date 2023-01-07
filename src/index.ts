import './index.html';
import './index.css';
import { Route } from '../src/conponents/routes/Routes';
import { Rest_button } from './conponents/counter/Counter';
Route.start();

function checker(): void {
  if (localStorage.getItem('count') === null) Rest_button()
}
checker();