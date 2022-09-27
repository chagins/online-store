import './products.scss';
import { IProduct } from '../../types/types';

class Products {
  public draw(products: IProduct[]): void {
    const container: HTMLDivElement | null = document.querySelector('.content');
    const maxRating = 5;

    products.forEach((item): void => {
      console.log(item);

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

      container?.appendChild(productCard);
    });
  }
}

export default Products;
