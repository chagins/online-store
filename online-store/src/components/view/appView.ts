import Products from './products/products';
import Filter from './filter/filter';
import Header from './header/header';
import { IControls, IProduct, ISettings } from '../types/types';

class AppView {
  private products: Products;
  private filter: Filter;
  private header: Header;
  private controls: IControls;

  constructor() {
    this.products = new Products();
    this.filter = new Filter();
    this.header = new Header();
    this.controls = {
      sort: null,
      filter: {
        category: null,
        brand: null,
        color: null,
        'frame size': null,
        'wheel size': null,
      },
      range: {
        price: null,
        year: null,
        rating: null,
      },
      resetBtn: null,
    };
  }

  drawControls(settings: ISettings): void {
    this.drawHeader(settings, this.controls);
    this.drawFilter(settings, this.controls);
  }

  drawProducts(data: IProduct[]): void {
    this.products.draw(data);
  }

  drawHeader(settings: ISettings, controls: IControls): void {
    this.header.draw(settings, controls);
  }

  drawFilter(settings: ISettings, controls: IControls): void {
    this.filter.draw(settings, controls);
  }

  getControls(): IControls {
    return this.controls;
  }
}

export default AppView;
