import AppController from '../src/components/controller/appController';
import AppSettings from '../src/components/controller/appSettings';
import * as t from './testData';

describe('AppController getProduct method', (): void => {
  const controller = new AppController(AppSettings);

  test('AppController defines getProduct method', (): void => {
    expect(typeof controller.getProduct).toBe('function');
  });

  test('getProduct returns Iproduct that contains fields', (): void => {
    t.productFields.forEach((item) => expect(controller.getProduct(0)).toHaveProperty(`${item}`));
  });

  test('Object by id = 0 matches', (): void => {
    expect(controller.getProduct(0)).toEqual(t.products[0]);
  });

  test('Object by id = 3 matches', (): void => {
    expect(controller.getProduct(3)).toEqual(t.products[1]);
  });

  test('Object by id = -100 not matches', (): void => {
    expect(controller.getProduct(-100)).not.toEqual(t.products[0]);
  });
});

describe('AppController filterByProperty method for products filtering', (): void => {
  test('Test filterByProperty for filtering by product brand', (): void => {
    const controller = new AppController(AppSettings);
    AppController['settings'].filter.brand.current = t.filteringBrandCurrent;
    const getProductsResult = controller['filterByProperty'](
      AppController['settings'],
      controller['products'].bikes
    );

    expect(getProductsResult[0]).toEqual(t.filteringProduct);
  });
});

describe('AppController sortByProperty method for products sorting', (): void => {
  test('Test "sortByProperty" for sorting by price desc', (): void => {
    const controller = new AppController(AppSettings);
    AppController['settings'].sort.fieldCurrent = 'price';
    AppController['settings'].sort.orderCurrent = 'descending';
    const getProductsResult = controller['sortByProperty'](
      AppController['settings'],
      controller['products'].bikes
    );

    expect(getProductsResult[0]).toEqual(t.sortingProduct);
  });
});

describe('AppController searchByProperty method for products searching', (): void => {
  test('Test "searchByProperty" for searching by product name', (): void => {
    const controller = new AppController(AppSettings);
    AppController['settings'].searchstring = 'caliper';
    const getProductsResult = controller['searchByProperty'](
      AppController['settings'],
      controller['products'].bikes
    );

    expect(getProductsResult[0]).toEqual(t.searchingProduct);
  });
});

describe('AppController\'s "setSettings" for save settings to storage', (): void => {
  const controller = new AppController(AppSettings);
  const searchStringInObject = AppController['settings'].searchstring;
  const searchString = 'caliper';
  AppController['settings'].searchstring = searchString;
  controller.setSettings();
  const searchStringInStorage = JSON.parse(localStorage.getItem('online-store-chagins') as string)[
    'searchstring'
  ];

  test('Test that searchstring in new AppController object is empty', (): void => {
    expect(searchStringInObject).not.toBeTruthy();
  });

  test('Test that searchstring in AppController object is match with example', (): void => {
    expect(AppController['settings'].searchstring).toBe(searchString);
  });

  test('Test that searchstring in AppController object is match with storage', (): void => {
    expect(AppController['settings'].searchstring).toBe(searchStringInStorage);
  });
});
