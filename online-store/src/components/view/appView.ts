import Products from './products/products';
import Filter from './filter/filter';
import Header from './header/header';
import { IProduct, ISettings, sliderUI } from '../types/types';

class AppView {
  private products: Products;
  private filter: Filter;
  private header: Header;

  constructor() {
    this.products = new Products();
    this.filter = new Filter();
    this.header = new Header();
  }

  drawHeader(settings: ISettings): void {
    this.header.draw(settings);
  }

  drawProducts(data: IProduct[]): void {
    this.products.draw(data);
  }

  drawFilter(settings: ISettings): void {
    this.filter.draw(settings);
  }

  getUISliders(): sliderUI[] {
    return this?.filter?.sliders as sliderUI[];
  }
}

export default AppView;
