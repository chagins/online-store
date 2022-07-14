import {
  IProduct,
  callbackFun,
  ILoaderConstructable,
  ILoader,
  ISettings,
  getKeyValue,
  filteringField,
  sortingField,
  rangingField,
} from '../types/types';
import bikesJSON from '../../assets/json/bikes.json';

const loadedSettings: ISettings = {
  sort: {
    fieldTypes: ['product', 'year', 'rating', 'price'],
    fieldCurrent: 'product',
    orderTypes: ['ascending', 'descending'],
    orderCurrent: 'ascending',
  },
  filter: {
    category: {
      types: ['select category'],
      current: null,
    },
    brand: {
      types: ['select brand'],
      current: null,
    },
    color: {
      types: ['select color'],
      current: null,
    },
    'frame size': {
      types: ['select frame size'],
      current: null,
    },
    'wheel size': {
      types: ['select wheel size'],
      current: null,
    },
  },
  range: {
    price: {
      min: null,
      max: null,
      current: [null, null],
      format: {
        decimals: 2,
        step: 1,
      },
    },
    year: {
      min: null,
      max: null,
      current: [null, null],
      format: {
        decimals: 0,
        step: 1,
      },
    },
    rating: {
      min: null,
      max: null,
      current: [null, null],
      format: {
        decimals: 0,
        step: 1,
      },
    },
  },
};

class AppController {
  private loaderService: ILoader;

  constructor(loaderService: ILoaderConstructable) {
    this.loaderService = new loaderService();
  }

  loadSettings(drawCallback: callbackFun<ISettings>): ISettings {
    const appSettings = loadedSettings;
    // parsing JSON to collect available bike options
    const products = bikesJSON.bikes as IProduct[];
    for (const product of products) {
      for (const property in product) {
        if (property in appSettings.filter) {
          const propertyValue = property as filteringField;
          const filterProperty = getKeyValue(appSettings.filter)(propertyValue);
          if (!filterProperty.types.includes(product[propertyValue])) {
            appSettings.filter[propertyValue].types.push(product[propertyValue]);
          }
        }
        if (property in appSettings.range) {
          const propertyValue = property as rangingField;
          const rangeProperty = getKeyValue(appSettings.range)(propertyValue);
          if (rangeProperty.min === null || product[propertyValue] < rangeProperty.min) {
            appSettings.range[propertyValue].min = product[propertyValue];
          }
          if (rangeProperty.max === null || product[propertyValue] > rangeProperty.max) {
            appSettings.range[propertyValue].max = product[propertyValue];
          }
        }
      }
    }

    // setting default filtering values
    for (const filterName in appSettings.filter) {
      const filterNameValue = filterName as filteringField;
      if (appSettings.filter[filterNameValue].current === null) {
        appSettings.filter[filterNameValue].current = appSettings.filter[filterNameValue].types[0];
      }
    }

    // setting default range values
    for (const rangeName in appSettings.range) {
      const rangeNameValue = rangeName as rangingField;
      if (
        appSettings.range[rangeNameValue].current[0] === null ||
        appSettings.range[rangeNameValue].current[1] === null
      ) {
        appSettings.range[rangeNameValue].current[0] = appSettings.range[rangeNameValue]
          .min as number;
        appSettings.range[rangeNameValue].current[1] = appSettings.range[rangeNameValue]
          .max as number;
      }
    }

    drawCallback(appSettings);
    return appSettings;
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
