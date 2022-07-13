import './products.scss';
import { IProduct } from '../../types/types';

const sortingFields: string[] = ['product', 'year', 'rating', 'price'];
const sortingOrders = new Map<number, string>([
  [129123, 'ascending'], // 🡣
  [129121, 'descending'], // 🡡
]);

class Products {
  container: HTMLDivElement | null;

  constructor() {
    this.container = document.querySelector('.content');
    const contentHeader: HTMLDivElement = document.createElement('div');
    contentHeader.classList.add('content-header');

    const inputSort: HTMLSelectElement = document.createElement('select');
    inputSort.classList.add('input-sort');

    for (const field of sortingFields) {
      for (const [orderKey, orderValue] of sortingOrders) {
        const option: HTMLOptionElement = document.createElement('option');
        option.classList.add('option-sort');
        option.value = `${field}:${orderValue}`;
        const orderSymbol = String.fromCodePoint(orderKey);
        option.innerText = `${field.charAt(0).toUpperCase()}${field.slice(1)} ${orderSymbol}`;
        inputSort.appendChild(option);
      }
    }

    contentHeader?.appendChild(inputSort);
    this.container?.appendChild(contentHeader);
  }

  private clearContent(): void {
    const cards = this.container?.querySelectorAll('.product-card') as NodeListOf<Element>;
    if (cards) cards?.forEach((element: Element): void => element.remove());
  }

  public draw(products: IProduct[]): void {
    this.clearContent();
    const maxRating = 5;

    products.forEach((item): void => {
      const productCard: HTMLDivElement = document.createElement('div');
      productCard.classList.add('product-card');

      const cardPicture: HTMLImageElement = document.createElement('img');
      cardPicture.src = `./assets/img/${item.picture[0]}.jpg`;
      cardPicture.classList.add('card-picture');
      productCard.appendChild(cardPicture);

      const cardProps: HTMLDivElement = document.createElement('div');
      cardProps.classList.add('card-props');

      const productName: HTMLParagraphElement = document.createElement('p');
      productName.innerText = item.product;
      productName.classList.add('product-name');
      cardProps.appendChild(productName);

      const productDetails: HTMLDivElement = document.createElement('div');
      productDetails.classList.add('product-details');

      const bikeProps: HTMLDivElement = document.createElement('div');
      bikeProps.classList.add('bike-props');

      const rating: HTMLDivElement = document.createElement('div');
      rating.classList.add('rating');
      const starsCount = item.rating;
      for (let i = 0; i < starsCount; i++) {
        const starYellow: HTMLDivElement = document.createElement('div');
        starYellow.classList.add('star-yellow');
        rating.appendChild(starYellow);
      }
      for (let i = 0; i < maxRating - starsCount; i++) {
        const starGray: HTMLDivElement = document.createElement('div');
        starGray.classList.add('star-gray');
        rating.appendChild(starGray);
      }
      bikeProps.appendChild(rating);

      const size: HTMLParagraphElement = document.createElement('p');
      size.classList.add('size');
      size.innerText = `${item['frame size']} ${item['wheel size']}`;
      bikeProps.appendChild(size);

      const price: HTMLParagraphElement = document.createElement('p');
      price.classList.add('price');
      price.innerText = `${item.price}$`;
      bikeProps.appendChild(price);

      productDetails.appendChild(bikeProps);

      const buyBtn: HTMLButtonElement = document.createElement('button');
      buyBtn.classList.add('buy-btn');
      buyBtn.innerText = 'BUY';

      productDetails.appendChild(buyBtn);

      cardProps.appendChild(productDetails);
      productCard.appendChild(cardProps);

      this.container?.appendChild(productCard);
    });
  }
}

export default Products;
