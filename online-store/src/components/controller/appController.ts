import { IProduct, callbackFun, ILoaderConstructable, ILoader } from '../types/types';
import bikesJSON from '../../assets/json/bikes.json';

class AppController {
  private loaderService: ILoader;

  constructor(loaderService: ILoaderConstructable) {
    this.loaderService = new loaderService();
  }

  getProducts(drawCallback: callbackFun<IProduct[]>): void {
    const products: IProduct[] = bikesJSON.bikes as IProduct[];
    this.loaderService.load<IProduct[]>(products, drawCallback);
  }
}

export default AppController;
