import AppController from '../controller/appController';
import AppView from '../view/appView';
import Loader from '../controller/loader';
import AppSettings from '../controller/appSettings';
import {
  IProduct,
  sortingField,
  sortingOrder,
  ISettings,
  filteringField,
  sliderUI,
  rangingField,
} from '../types/types';
import { API } from 'nouislider';

class App {
  private controller: AppController;
  private appView: AppView;
  static appSettings: ISettings;

  constructor() {
    this.controller = new AppController(Loader, AppSettings);
    this.appView = new AppView();
  }

  public start(): void {
    // App.appSettings = this.controller.collectSettings((data: ISettings): void => {
    //   this.appView.drawFilter(data);
    //   this.appView.drawHeader(data);
    // });

    App.appSettings = this.controller.getSettings((data: ISettings): void => {
      this.appView.drawFilter(data);
      this.appView.drawHeader(data);
    });

    this.controller.getProducts((data: IProduct[]): void => {
      return this.appView.drawProducts(data);
    }, App.appSettings);

    this.initControls();
    const filterBtn = document.querySelector('.filter-btn');
    if (filterBtn) {
      filterBtn.addEventListener('click', (): void => {
        console.log('click');
      });
    }
  }

  private initControls(): void {
    const inputSort = document.querySelector('.input-sort') as HTMLSelectElement;
    if (inputSort) {
      inputSort.addEventListener('change', (e: Event): void => {
        const target = e?.target as HTMLSelectElement;
        const sortFieldValue = target.value.split(':')[0] as sortingField;
        const sortOrderValue = target.value.split(':')[1] as sortingOrder;
        App.appSettings.sort.fieldCurrent = sortFieldValue;
        App.appSettings.sort.orderCurrent = sortOrderValue;
        this.controller.getProducts((data: IProduct[]): void => {
          return this.appView.drawProducts(data);
        }, App.appSettings);
      });
    }

    const filterElements: NodeListOf<HTMLSelectElement> =
      document.querySelectorAll('select.filter');
    filterElements.forEach((filterElement): void => {
      filterElement?.addEventListener('change', (e: Event): void => {
        const targetFilterElement = e?.target as HTMLSelectElement;
        targetFilterElement.dataset.option = targetFilterElement.value;
        const filterType = targetFilterElement.id as filteringField;
        App.appSettings.filter[filterType].current = targetFilterElement.value;
        this.controller.getProducts((data: IProduct[]): void => {
          return this.appView.drawProducts(data);
        }, App.appSettings);
      });
    });

    const rangeInstances: sliderUI[] = this.appView.getUISliders();
    rangeInstances.forEach((range): void => {
      const rangeInstance = range?.sliderInstance as API;
      rangeInstance.on('change', (values): void => {
        const settings = App.appSettings;
        const params = values as string[];
        const [currentMin, currentMax] = params.map((item) => Number.parseFloat(item));
        const rangeType = range.sliderId as rangingField;
        settings.range[rangeType].current = [currentMin, currentMax];
        App.appSettings = settings;
        this.controller.getProducts((data: IProduct[]): void => {
          return this.appView.drawProducts(data);
        }, settings);
      });
    });

    const resetBtn = document.querySelector('.reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', (): void => {
        for (const property in App.appSettings.filter) {
          const propertyValue = property as filteringField;
          App.appSettings.filter[propertyValue].current =
            App.appSettings.filter[propertyValue].types[0];
        }
        for (const property in App.appSettings.range) {
          const propertyValue = property as rangingField;
          const min = App.appSettings.range[propertyValue].min;
          const max = App.appSettings.range[propertyValue].max;
          App.appSettings.range[propertyValue].current = [min, max];
        }
        this.start();
        // this.appView.drawFilter(App.appSettings);
        // this.appView.drawHeader(App.appSettings);
        // this.controller.getProducts((data: IProduct[]): void => {
        //   return this.appView.drawProducts(data);
        // }, App.appSettings);
      });
    }
  }
}

export default App;
