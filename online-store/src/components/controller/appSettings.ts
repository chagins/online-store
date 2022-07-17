import {
  filteringField,
  getKeyValue,
  IAppSettings,
  IProducts,
  ISettings,
  rangingField,
} from '../types/types';

class AppSettings implements IAppSettings {
  private appSettings: ISettings;
  private sourceSettings: IProducts;

  constructor(source: IProducts) {
    this.sourceSettings = source;
    this.appSettings = {
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
  }

  public getSettings(): ISettings {
    return this.collectSettings().setDefaultSettings().appSettings;
  }

  // parsing data source to collect available bike option values
  private collectSettings(): AppSettings {
    const products = this.sourceSettings.bikes;
    for (const product of products) {
      for (const property in product) {
        if (property in this.appSettings.filter) {
          const propertyValue = property as filteringField;
          const filterProperty = getKeyValue(this.appSettings.filter)(propertyValue);
          if (!filterProperty.types.includes(product[propertyValue])) {
            this.appSettings.filter[propertyValue].types.push(product[propertyValue]);
          }
        }
        if (property in this.appSettings.range) {
          const propertyValue = property as rangingField;
          const rangeProperty = getKeyValue(this.appSettings.range)(propertyValue);
          if (rangeProperty.min === null || product[propertyValue] < rangeProperty.min) {
            this.appSettings.range[propertyValue].min = product[propertyValue];
          }
          if (rangeProperty.max === null || product[propertyValue] > rangeProperty.max) {
            this.appSettings.range[propertyValue].max = product[propertyValue];
          }
        }
      }
    }

    return this;
  }

  // setting default filtering and range values
  setDefaultSettings(): AppSettings {
    for (const filterName in this.appSettings.filter) {
      const filterNameValue = filterName as filteringField;
      if (this.appSettings.filter[filterNameValue].current === null) {
        this.appSettings.filter[filterNameValue].current =
          this.appSettings.filter[filterNameValue].types[0];
      }
    }

    for (const rangeName in this.appSettings.range) {
      const rangeNameValue = rangeName as rangingField;
      if (
        this.appSettings.range[rangeNameValue].current[0] === null ||
        this.appSettings.range[rangeNameValue].current[1] === null
      ) {
        this.appSettings.range[rangeNameValue].current[0] = this.appSettings.range[rangeNameValue]
          .min as number;
        this.appSettings.range[rangeNameValue].current[1] = this.appSettings.range[rangeNameValue]
          .max as number;
      }
    }

    return this;
  }
}

export default AppSettings;
