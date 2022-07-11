import Loader from './loader';
import { IProduct, callbackFun } from '../types/types';
import bikesJSON from '../../assets/json/bikes.json';

class AppController extends Loader {
  getProducts(drawCallback: callbackFun<IProduct[]>): void {
    const products: IProduct[] = bikesJSON.bikes as IProduct[];
    super.load<IProduct[]>(products, drawCallback);
  }
}

export default AppController;
