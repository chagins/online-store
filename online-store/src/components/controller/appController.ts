import {
  IProduct,
  callbackFun,
  ISettings,
  filteringField,
  sortingField,
  rangingField,
  IAppSettingsConstructable,
  IAppSettings,
  IProducts,
  IControls,
  sortingOrder,
} from '../types/types';
import bikesJSON from '../../assets/json/bikes.json';
import { API } from 'nouislider';

class AppController {
  private settingService: IAppSettings;
  private readonly products: IProducts;
  private static settings: ISettings;

  constructor(settingService: IAppSettingsConstructable) {
    this.settingService = new settingService(bikesJSON);
    this.products = bikesJSON as IProducts;
    AppController.settings = this.settingService.loadSettings();
  }

  public static getSettings(): ISettings {
    return AppController.settings;
  }

  public setSettings(): void {
    this.settingService.saveSettings(AppController.settings);
  }

  public initControls({
    controls,
    productsDrawCallback,
    restartCallback,
  }: {
    controls: IControls;
    productsDrawCallback: callbackFun<IProduct[]>;
    restartCallback: callbackFun<void>;
  }): void {
    if (controls.sort) {
      controls.sort.value = `${AppController.settings.sort.fieldCurrent}:${AppController.settings.sort.orderCurrent}`;
      controls.sort.addEventListener('change', (e: Event): void => {
        const target = e?.target as HTMLSelectElement;
        const sortFieldValue = target.value.split(':')[0] as sortingField;
        const sortOrderValue = target.value.split(':')[1] as sortingOrder;
        AppController.settings.sort.fieldCurrent = sortFieldValue;
        AppController.settings.sort.orderCurrent = sortOrderValue;
        this.setSettings();
        productsDrawCallback(this.getProducts());
      });
    }

    if (controls.filter) {
      for (const filterName in controls.filter) {
        const filterElement = filterName as filteringField;
        // set controls state from settings
        (controls?.filter[filterElement] as HTMLSelectElement).value =
          AppController.settings.filter[filterElement].current ?? '';
        (controls?.filter[filterElement] as HTMLSelectElement).dataset.option =
          AppController.settings.filter[filterElement].current ?? '';
        // set control events
        controls.filter[filterElement]?.addEventListener('change', (e: Event): void => {
          const targetFilterElement = e?.target as HTMLSelectElement;
          targetFilterElement.dataset.option = targetFilterElement.value;
          const filterType = targetFilterElement.id as filteringField;
          AppController.settings.filter[filterType].current = targetFilterElement.value;
          this.setSettings();
          productsDrawCallback(this.getProducts());
        });
      }
    }

    if (controls.range) {
      for (const rangeName in controls.range) {
        const rangeInstance = rangeName as rangingField;
        // set controls state from settings
        const values = AppController.settings.range[rangeInstance].current as number[];
        (controls?.range[rangeInstance] as API).set(values);
        // set control events
        controls.range[rangeInstance]?.on('change', (values): void => {
          const params = values as string[];
          const [currentMin, currentMax] = params.map((item): number => Number.parseFloat(item));
          AppController.settings.range[rangeInstance].current = [currentMin, currentMax];
          this.setSettings();
          productsDrawCallback(this.getProducts());
        });
      }
    }

    if (controls.resetBtn) {
      controls.resetBtn.addEventListener('click', (): void => {
        for (const property in AppController.settings.filter) {
          const propertyValue = property as filteringField;
          AppController.settings.filter[propertyValue].current =
            AppController.settings.filter[propertyValue].types[0];
        }
        for (const property in AppController.settings.range) {
          const propertyValue = property as rangingField;
          const min = AppController.settings.range[propertyValue].min;
          const max = AppController.settings.range[propertyValue].max;
          AppController.settings.range[propertyValue].current = [min, max];
        }
        this.setSettings();
        restartCallback();
      });
    }

    if (controls.homeLink) {
      controls.homeLink.addEventListener('click', (): void => {
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
        restartCallback();
      });
    }
  }

  initCards({
    cards,
    productCardDrawCallback,
    controls,
  }: {
    cards: HTMLDivElement[];
    productCardDrawCallback: callbackFun<IProduct>;
    controls: IControls;
  }): void {
    cards.forEach((card): void => {
      card.addEventListener('click', (e: Event): void => {
        const target = e.target as HTMLElement;
        const currentCard = e.currentTarget as HTMLDivElement;
        if (!target.classList.contains('buy-btn')) {
          if (currentCard.parentElement?.classList.contains('content-productcard')) return;
          const findedProduct = this.getProduct(+currentCard.id);
          if (findedProduct) productCardDrawCallback(findedProduct);
        }
        if (target.classList.contains('buy-btn')) {
          if (AppController.settings.cart.productid.includes(+currentCard.id)) return;
          if (
            AppController.settings.cart.productid.length === AppController.settings.cart.maxproducts
          ) {
            alert('Извините, все слоты корзины заполнены');
            return;
          }
          if (currentCard.dataset.incart === 'yes') return;
          const buyBtn = target as HTMLButtonElement;
          // const findedProduct = this.getProduct(+currentCard.id);
          buyBtn.innerText = 'IN CART';
          currentCard.dataset.incart = 'yes';
          currentCard.classList.add('incart');
          (controls.productCart.cart as HTMLDivElement).animate(
            [
              { transform: 'rotate(0deg)' },
              { transform: 'rotate(20deg)' },
              { transform: 'rotate(-20deg)' },
              { transform: 'rotate(0deg)' },
            ],
            {
              duration: 500,
            }
          );
          let currentProductsInCart = Number.parseInt(
            controls.productCart.cartCount?.innerText as string
          );
          const maxProducts = AppController.settings.cart.maxproducts;
          if (currentProductsInCart < maxProducts) {
            currentProductsInCart += 1;
            (
              controls.productCart.cartCount as HTMLParagraphElement
            ).innerText = `${currentProductsInCart}`;
          }
          AppController.settings.cart.productid.push(+currentCard.id);
          this.setSettings();
        }
      });
    });
  }

  public getProduct(productID: number): IProduct | null {
    const findedProduct = this.products.bikes.find((product): boolean => {
      return product.id === productID;
    });

    return findedProduct ? findedProduct : null;
  }

  public getProducts(): IProduct[] {
    let products = this.products.bikes;
    products = this.filterByProperty(AppController.settings, products);
    products = this.sortByProperty(AppController.settings, products);
    return products;
  }

  private sortByProperty(settings: ISettings, data: IProduct[]): IProduct[] {
    const sortValue: sortingField = settings.sort.fieldCurrent;
    data.sort((objA: IProduct, objB: IProduct): 1 | -1 | 0 => {
      if (settings.sort.orderCurrent === 'ascending') {
        return objA[sortValue] < objB[sortValue] ? -1 : 1;
      } else if (settings.sort.orderCurrent === 'descending') {
        return objA[sortValue] > objB[sortValue] ? -1 : 1;
      } else return 0;
    });
    return data;
  }

  private filterByProperty(settings: ISettings, data: IProduct[]): IProduct[] {
    return data.filter((product): boolean => {
      let isFilterMatch = true;
      for (const filter in settings.filter) {
        const filterValue = filter as filteringField;
        if (!(filterValue in product)) continue;
        if (settings.filter[filterValue].current === `select ${filterValue}`) continue;
        if (settings.filter[filterValue].current !== product[filterValue]) {
          isFilterMatch = false;
        }
      }
      for (const range in settings.range) {
        const rangeValue = range as rangingField;
        const [currentMin, currentMax] = settings.range[rangeValue].current as number[];
        if (!(rangeValue in product)) continue;
        if (currentMin > product[rangeValue] || currentMax < product[rangeValue]) {
          isFilterMatch = false;
        }
      }
      return isFilterMatch;
    });
  }
}

export default AppController;
