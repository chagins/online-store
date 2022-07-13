import {
  IProduct,
  callbackFun,
  ILoaderConstructable,
  ILoader,
  ISettings,
  sortingField,
  sortingOrder,
} from '../types/types';
import bikesJSON from '../../assets/json/bikes.json';

class AppController {
  private loaderService: ILoader;

  constructor(loaderService: ILoaderConstructable) {
    this.loaderService = new loaderService();
  }

  getProducts(drawCallback: callbackFun<IProduct[]>, settings: ISettings): void {
    const products: IProduct[] = bikesJSON.bikes as IProduct[];
    this.sortByProperty(settings.sortField, settings.sortOrder, products);
    this.loaderService.load<IProduct[]>(products, drawCallback);

    const inputSort = document.querySelector('.input-sort') as HTMLSelectElement;
    if (inputSort) inputSort.value = `${settings.sortField}:${settings.sortOrder}`;
  }

  private sortByProperty(sortField: sortingField, sortOrder: sortingOrder, data: IProduct[]): void {
    const sortValue = sortField.split(':')[0] as sortingField;
    data.sort((objA: IProduct, objB: IProduct): 1 | -1 | 0 => {
      if (sortOrder === 'ascending') {
        return objA[sortValue] < objB[sortValue] ? -1 : 1;
      } else if (sortOrder === 'descending') {
        return objA[sortValue] > objB[sortValue] ? -1 : 1;
      } else return 0;
    });
  }
}

export default AppController;
