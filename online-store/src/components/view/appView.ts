import Products from './products/products';
import { IProduct } from '../types/types';

class AppView {
  private products: Products;

  constructor() {
    this.products = new Products();
  }

  drawProducts(data: IProduct[]): void {
    this.products.draw(data);
  }
}

export default AppView;
