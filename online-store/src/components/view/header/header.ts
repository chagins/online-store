import { IControls, ISettings } from '../../types/types';
import AppController from '../../controller/appController';
import './header.scss';

class Header {
  private container: HTMLDivElement | null;

  constructor() {
    const parentContainer = document.querySelector('.content');
    const contentHeader: HTMLDivElement = document.createElement('div');
    contentHeader.classList.add('content-header');
    parentContainer?.prepend(contentHeader);
    this.container = contentHeader;
  }

  private clearContent(): void {
    if (this.container) this.container.innerHTML = '';
  }

  public draw(settings: ISettings, controls: IControls): void {
    this.clearContent();

    const inputSort: HTMLSelectElement = document.createElement('select');
    inputSort.classList.add('input-sort');

    for (const field of settings.sort.fieldTypes) {
      for (const order of settings.sort.orderTypes) {
        const option: HTMLOptionElement = document.createElement('option');
        option.classList.add('option-sort');
        option.value = `${field}:${order}`;
        option.innerText = `${field} ${order}`;
        inputSort.appendChild(option);
      }
    }

    inputSort.value = `${settings.sort.fieldCurrent}:${settings.sort.orderCurrent}`;
    this.container?.appendChild(inputSort);
    controls.sort = inputSort;

    const homeLink: HTMLAnchorElement = document.createElement('a');
    homeLink.href = '#';
    homeLink.innerText = '🏠HOME PAGE';
    homeLink.classList.add('homeLink');
    homeLink.title = 'Go to home app page';
    controls.homeLink = homeLink;
    this.container?.appendChild(homeLink);

    const productCart = document.createElement('div');
    productCart.classList.add('product-cart');
    const cartCount = document.createElement('p');
    cartCount.classList.add('cart-count');
    cartCount.innerText = '0';
    productCart.appendChild(cartCount);
    const cart = document.createElement('div');
    cart.classList.add('cart');
    productCart.appendChild(cart);

    if (AppController.getSettings().cart.productid.length > 0) {
      cartCount.innerText = `${AppController.getSettings().cart.productid.length}`;
    }

    controls.productCart.cartCount = cartCount;
    controls.productCart.cart = productCart;
    this.container?.appendChild(productCart);
  }
}

export default Header;
