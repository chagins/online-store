import Products from './products/products';
import Filter from './filter/filter';
import Header from './header/header';
import { IControls, IProduct, ISettings } from '../types/types';
import ProductCard from './productcard/productcard';

class AppView {
  private products: Products;
  private productCard: ProductCard;
  private filter: Filter;
  private header: Header;
  private controls: IControls;

  constructor() {
    this.products = new Products();
    this.productCard = new ProductCard();
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
      homeLink: null,
      productCart: {
        cartCount: null,
        cart: null,
        maxCartCount: 20,
      },
    };
  }

  drawControls(settings: ISettings): void {
    this.drawHeader(settings, this.controls);
    this.drawFilter(settings, this.controls);
  }

  drawProducts(data: IProduct[]): void {
    const sidePanel = document.querySelector('.side-panel') as HTMLDivElement;
    if (sidePanel) sidePanel.classList.remove('hide');
    const inputSort = document.querySelector('.input-sort') as HTMLSelectElement;
    if (inputSort) inputSort.classList.remove('hide');
    const homeLink = document.querySelector('.homeLink') as HTMLAnchorElement;
    if (homeLink) homeLink.classList.remove('hide');
    const contentProducts = document.querySelector('.content-products') as HTMLDivElement;
    if (contentProducts) contentProducts.classList.remove('hide');
    const contentProductCard = document.querySelector('.content-productcard') as HTMLDivElement;
    if (contentProductCard) contentProductCard.innerHTML = '';

    this.products.draw(data);
  }

  drawHeader(settings: ISettings, controls: IControls): void {
    this.header.draw(settings, controls);
  }

  drawFilter(settings: ISettings, controls: IControls): void {
    this.filter.draw(settings, controls);
  }

  drawProductCard(data: IProduct): void {
    const sidePanel = document.querySelector('.side-panel') as HTMLDivElement;
    if (sidePanel) sidePanel.classList.toggle('hide');
    const inputSort = document.querySelector('.input-sort') as HTMLSelectElement;
    if (inputSort) inputSort.classList.toggle('hide');
    const homeLink = document.querySelector('.homeLink') as HTMLAnchorElement;
    if (homeLink) homeLink.classList.toggle('hide');
    const contentProducts = document.querySelector('.content-products') as HTMLDivElement;
    if (contentProducts) contentProducts.classList.toggle('hide');

    this.productCard.draw(data);
  }

  getControls(): IControls {
    return this.controls;
  }

  getProductCards(): HTMLDivElement[] {
    return this.products.getProductCards();
  }
}

export default AppView;
