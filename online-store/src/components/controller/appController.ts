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

class AppController {
  private settingService: IAppSettings;
  private readonly products: IProducts;
  private settings: ISettings;

  constructor(settingService: IAppSettingsConstructable) {
    this.settingService = new settingService(bikesJSON);
    this.products = bikesJSON as IProducts;
    this.settings = this.settingService.getSettings();
  }

  public getSettings(): ISettings {
    return this.settings;
  }

  public initControls(
    controls: IControls,
    productsDrawCallback: callbackFun<IProduct[]>,
    restartCallback: callbackFun<void>
  ): void {
    if (controls.sort) {
      controls.sort.addEventListener('change', (e: Event): void => {
        const target = e?.target as HTMLSelectElement;
        const sortFieldValue = target.value.split(':')[0] as sortingField;
        const sortOrderValue = target.value.split(':')[1] as sortingOrder;
        this.settings.sort.fieldCurrent = sortFieldValue;
        this.settings.sort.orderCurrent = sortOrderValue;
        productsDrawCallback(this.getProducts());
      });
    }

    if (controls.filter) {
      for (const filterName in controls.filter) {
        const filterElement = filterName as filteringField;
        controls.filter[filterElement]?.addEventListener('change', (e: Event): void => {
          const targetFilterElement = e?.target as HTMLSelectElement;
          targetFilterElement.dataset.option = targetFilterElement.value;
          const filterType = targetFilterElement.id as filteringField;
          this.settings.filter[filterType].current = targetFilterElement.value;
          productsDrawCallback(this.getProducts());
        });
      }
    }

    if (controls.range) {
      for (const rangeName in controls.range) {
        const rangeInstance = rangeName as rangingField;
        controls.range[rangeInstance]?.on('change', (values): void => {
          const params = values as string[];
          const [currentMin, currentMax] = params.map((item): number => Number.parseFloat(item));
          this.settings.range[rangeInstance].current = [currentMin, currentMax];
          productsDrawCallback(this.getProducts());
        });
      }
    }

    if (controls.resetBtn) {
      controls.resetBtn.addEventListener('click', (): void => {
        for (const property in this.settings.filter) {
          const propertyValue = property as filteringField;
          this.settings.filter[propertyValue].current =
            this.settings.filter[propertyValue].types[0];
        }
        for (const property in this.settings.range) {
          const propertyValue = property as rangingField;
          const min = this.settings.range[propertyValue].min;
          const max = this.settings.range[propertyValue].max;
          this.settings.range[propertyValue].current = [min, max];
        }
        restartCallback();
      });
    }
  }

  public getProducts(): IProduct[] {
    let products = this.products.bikes;
    products = this.filterByProperty(this.settings, products);
    products = this.sortByProperty(this.settings, products);
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
