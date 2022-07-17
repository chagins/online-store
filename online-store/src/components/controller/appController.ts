import {
  IProduct,
  callbackFun,
  ILoaderConstructable,
  ILoader,
  ISettings,
  filteringField,
  sortingField,
  rangingField,
  IAppSettingsConstructable,
  IAppSettings,
} from '../types/types';
import bikesJSON from '../../assets/json/bikes.json';

class AppController {
  private loaderService: ILoader;
  private settingService: IAppSettings;

  constructor(loaderService: ILoaderConstructable, settingService: IAppSettingsConstructable) {
    this.loaderService = new loaderService();
    this.settingService = new settingService(bikesJSON);
  }

  public getSettings(drawCallback: callbackFun<ISettings>): ISettings {
    const settings = this.settingService.getSettings();
    drawCallback(settings);
    return settings;
  }

  public getProducts(drawCallback: callbackFun<IProduct[]>, settings: ISettings): void {
    let products: IProduct[] = bikesJSON.bikes as IProduct[];
    products = this.filterByProperty(settings, products);
    products = this.sortByProperty(settings, products);
    this.loaderService.load<IProduct[]>(products, drawCallback);
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
