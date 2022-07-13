import AppController from '../controller/appController';
import AppView from '../view/appView';
import Loader from '../controller/loader';
import { IProduct, sortingField, sortingOrder } from '../types/types';

class App {
  private controller: AppController;
  private appView: AppView;

  constructor() {
    this.controller = new AppController(Loader);
    this.appView = new AppView();
  }

  public start(): void {
    this.controller.getProducts(
      (data: IProduct[]): void => {
        return this.appView.drawProducts(data);
      },
      { sortField: 'product', sortOrder: 'ascending' }
    );

    const inputSort = document.querySelector('.input-sort') as HTMLSelectElement;
    if (inputSort) {
      inputSort.addEventListener('change', (e: Event): void => {
        const target = e?.target as HTMLSelectElement;
        const sortFieldValue = target.value.split(':')[0] as sortingField;
        const sortOrderValue = target.value.split(':')[1] as sortingOrder;

        this.controller.getProducts(
          (data: IProduct[]): void => {
            return this.appView.drawProducts(data);
          },
          { sortField: sortFieldValue, sortOrder: sortOrderValue }
        );
      });
    }
  }
}

export default App;
