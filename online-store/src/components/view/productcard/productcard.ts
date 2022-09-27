import { IProduct } from '../../types/types';
import './productcard.scss';

class ProductCard {
  private container: HTMLDivElement | null;

  constructor() {
    const parentContainer = document.querySelector('.content');
    const contentProductCard: HTMLDivElement = document.createElement('div');
    contentProductCard.classList.add('content-productcard');
    parentContainer?.appendChild(contentProductCard);
    this.container = contentProductCard;
  }

  public clearContent(): void {
    if (this.container) this.container.innerHTML = '';
  }

  public draw(product: IProduct): void {
    this.clearContent();
    const maxRating = 5;

    const productCard: HTMLDivElement = document.createElement('div');
    productCard.classList.add('product-card');

    const cardPicture: HTMLImageElement = document.createElement('img');
    cardPicture.src = `./assets/img/${product.picture[0]}.jpg`;
    cardPicture.classList.add('card-picture');
    productCard.appendChild(cardPicture);

    const cardProps: HTMLDivElement = document.createElement('div');
    cardProps.classList.add('card-props');

    const productName: HTMLParagraphElement = document.createElement('p');
    productName.innerText = product.product;
    productName.classList.add('product-name');
    cardProps.appendChild(productName);

    const productDetails: HTMLDivElement = document.createElement('div');
    productDetails.classList.add('product-details');

    const bikeProps: HTMLDivElement = document.createElement('div');
    bikeProps.classList.add('bike-props');

    const rating: HTMLDivElement = document.createElement('div');
    rating.classList.add('rating');
    const starsCount = product.rating;
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
    size.innerText = `${product['frame size']} ${product['wheel size']}`;
    bikeProps.appendChild(size);

    const price: HTMLParagraphElement = document.createElement('p');
    price.classList.add('price');
    price.innerText = `${product.price}$`;
    bikeProps.appendChild(price);

    productDetails.appendChild(bikeProps);

    const buyBtn: HTMLButtonElement = document.createElement('button');
    buyBtn.classList.add('buy-btn');
    buyBtn.innerText = 'BUY';

    productDetails.appendChild(buyBtn);

    const productParticular: HTMLDivElement = document.createElement('div');
    productParticular.classList.add('product-particular');
    const particulars = [
      'count',
      'year',
      'color',
      'brand',
      'frame size',
      'wheel size',
      'rating',
      'category',
      'Frame',
      'Fork',
      'Crankset',
      'Rear Derailleur',
      'Cassette',
      'Chain',
      'Wheelset',
      'Weight',
    ];

    particulars.forEach((item): void => {
      const part = document.createElement('p');
      part.classList.add('particular');
      const itemValue = item as keyof IProduct;
      part.innerText = `${itemValue}: ${product[itemValue] as string}`;
      productParticular.appendChild(part);
    });

    cardProps.appendChild(productDetails);
    cardProps.appendChild(productParticular);
    productCard.appendChild(cardProps);

    productCard.id = `${product.id}`;
    this.container?.appendChild(productCard);
  }
}

export default ProductCard;
