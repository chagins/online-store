import './products.scss';
import { IProduct } from '../../types/types';
import AppController from '../../controller/appController';

class Products {
  private container: HTMLDivElement | null;
  static productCards: HTMLDivElement[];

  constructor() {
    const parentContainer = document.querySelector('.content');
    const contentProducts: HTMLDivElement = document.createElement('div');
    contentProducts.classList.add('content-products');
    parentContainer?.appendChild(contentProducts);
    this.container = contentProducts;
    Products.productCards = [];
  }

  private clearContent(): void {
    if (this.container) this.container.innerHTML = '';
  }

  public getProductCards(): HTMLDivElement[] {
    return Products.productCards;
  }

  public draw(products: IProduct[]): void {
    this.clearContent();
    const maxRating = 5;

    if (products.length === 0) {
      if (this.container) {
        this.container.style.color = '#000';
        this.container.style.fontSize = '1.5rem';
        this.container.innerText = 'Nothing was found. Please try again 🤷';
      }
    }

    // product
    products.forEach((product): void => {
      const savedProductCard = Products.productCards.find((card): boolean => {
        return product.id === +card.id;
      });

      if (savedProductCard) {
        this.container?.appendChild(savedProductCard);
      } else {
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

        cardProps.appendChild(productDetails);
        productCard.appendChild(cardProps);

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
          if (product[itemValue] === null) {
            part.innerText = `${itemValue}: `;
          } else {
            part.innerText = `${itemValue}: ${product[itemValue] as string}`;
          }
          productParticular.appendChild(part);
        });
        cardProps.appendChild(productParticular);

        productCard.id = `${product.id}`;

        if (AppController.getSettings().cart.productid.includes(product.id)) {
          productCard.dataset.incart = 'yes';
          productCard.classList.add('incart');
          buyBtn.innerText = 'IN CART';
        }
        this.container?.appendChild(productCard);
        Products.productCards.push(productCard);
      }
    });
  }
}

export default Products;
