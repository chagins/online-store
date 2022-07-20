import AppController from '../src/components/controller/appController';
import AppSettings from '../src/components/controller/appSettings';

describe('AppController\'s "getProduct" method', (): void => {
  const controller = new AppController(AppSettings);
  const getProductResult = controller.getProduct(0);
  const checkIsIProduct = function(obj: any): boolean  {
    const fields = ['id', 'picture', 'product', 'count', 'year', 'brand', 'frame size', 'wheel size', 
    'rating', 'category', 'price', 'Frame', 'Fork', 'Crankset', 'Rear Derailleur', 'Cassette', 'Chain',
      'Wheelset', 'Weight'];
    return fields.every(item => item in obj);
  };
  const isIproduct = checkIsIProduct(getProductResult);

  const Product0 = {
    id: 0,
    picture: [ 10 ],
    product: 'Vitus Sommet 297 CRX Mountain Bike 2022',
    count: 1,
    year: 2022,
    color: 'Green',
    brand: 'Vitus',
    'frame size': 'XL',
    'wheel size': '29',
    rating: 5,
    category: 'mountain',
    price: 5499.99,
    Frame: 'Sommet T700 carbon front triangle',
    Fork: 'Fox 38 Float EVOL Factory Series 29',
    Crankset: 'Shimano XT M8100, 12 Speed, 32T Narrow WidChainring, 170mm Crank Length',
    'Rear Derailleur': 'Shimano XT M8100, 12 Speed, Shadow Plus, Long Cage',
    Cassette: null,
    Chain: 'KMC x10 10 Speed 114',
    Wheelset: "Nukeproof Horizon V2 Wheelset, 29' Front, 27.5' Rear, 32H, 6 Bolt, Boost 110mm x 15mm Front and 148mm x 12mm Rear Hub Spacing, Tubeless Ready",
    Weight: null
  };

  const Product3 = {
    "id": 3,
    "picture": [30],
    "product": "Cube Aim Pro Hardtail Bike 2022",
    "count": 5,
    "year": 2022,
    "color": "Grey",
    "brand": "Cube",
    "frame size": "XS",
    "wheel size": "27.5",
    "rating": 5,
    "category": "mountain",
    "price": 844,
    "Frame": "Aluminium Lite, AMF, Double Butted, Internal Cable Routing, Tapered Head Tube, Flat Mount Brake, SIC Mount, FM Kickstand Mount",
    "Fork": "SR Suntour XCT, 100mm",
    "Crankset": "Shimano FC-M315, 36x22T",
    "Rear Derailleur": null,
    "Cassette": "Shimano CS-HG31, 11-34T",
    "Chain": "KMC Z8.3",
    "Wheelset": null,
    "Weight": 14.6
  };

  test('AppController defines getProduct', (): void => {
    expect(typeof controller.getProduct).toBe("function");
  });

  test('getProduct return IProduct by id', (): void => {
    expect(checkIsIProduct(getProductResult)).toBe(true);
  })

  test('Object by id = 0 matches', (): void => {
    expect(controller.getProduct(0)).toEqual(Product0)
  })

  test('Object by id = 3 matches', (): void => {
    expect(controller.getProduct(3)).toEqual(Product3)
  })

  test('Object by id = -100 not matches', (): void => {
    expect(controller.getProduct(-100)).not.toEqual(Product0)
  })

})

describe(
  'AppController\'s "filterByProperty" method for products filtering', 
  (): void => {
    const controller = new AppController(AppSettings);
    AppController['settings'].filter.brand.current = 'Felt';
    const settings = AppController['settings'];
    const products = controller['products'].bikes;
    const getProductsResult = controller['filterByProperty'](settings, products);

    const filteringObj = {
      id: 14,
      picture: [ 110 ],
      product: 'Felt Broam 30 Gravel Bike 2021',
      count: 3,
      year: 2021,
      color: 'Blue',
      brand: 'Felt',
      'frame size': 'XL',
      'wheel size': '700c',
      rating: 4,
      category: 'road',
      price: 2105,
      Frame: 'Felt BROAM - Adventure | SuperLite Aluminium',
      Fork: 'Felt Gravel - Adventure | UHC Performance Carbon Fibre with Aluminium steerer tube',
      Crankset: 'Shimano GRX RX600, 46/30T',
      'Rear Derailleur': 'Shimano GRX RX810',
      Cassette: 'Shimano 105 HG700, 11-34T',
      Chain: null,
      Wheelset: 'Devox WheelRDS.A1 with Shimano RS470 12mm Thru-Axe hubs',
      Weight: 10.56
    };
    
    test('Test "filterByProperty" for filtering by product\'s brand', (): void => {
      expect(getProductsResult[0]).toEqual(filteringObj)
    });
})

describe(
  'AppController\'s "sortByProperty" method for products sorting', 
  (): void => {
    const controller = new AppController(AppSettings);
    AppController['settings'].sort.fieldCurrent = 'price';
    AppController['settings'].sort.orderCurrent = 'descending';
    const settings = AppController['settings'];
    const products = controller['products'].bikes;
    const getProductsResult = controller['sortByProperty'](settings, products);

    const sortingObj = {
      "id": 0,
      "picture": [10],
      "product": "Vitus Sommet 297 CRX Mountain Bike 2022",
      "count": 1,
      "year": 2022,
      "color": "Green",
      "brand": "Vitus",
      "frame size": "XL",
      "wheel size": "29",
      "rating": 5,
      "category": "mountain",
      "price": 5499.99,
      "Frame": "Sommet T700 carbon front triangle",
      "Fork": "Fox 38 Float EVOL Factory Series 29",
      "Crankset": "Shimano XT M8100, 12 Speed, 32T Narrow WidChainring, 170mm Crank Length",
      "Rear Derailleur": "Shimano XT M8100, 12 Speed, Shadow Plus, Long Cage",
      "Cassette": null,
      "Chain": "KMC x10 10 Speed 114",
      "Wheelset": "Nukeproof Horizon V2 Wheelset, 29' Front, 27.5' Rear, 32H, 6 Bolt, Boost 110mm x 15mm Front and 148mm x 12mm Rear Hub Spacing, Tubeless Ready",
      "Weight": null
    };
    
    test('Test "sortByProperty" for sorting by price desc', (): void => {
      expect(getProductsResult[0]).toEqual(sortingObj)
    });
})

describe(
  'AppController\'s "searchByProperty" method for products searching', 
  (): void => {
    const controller = new AppController(AppSettings);
    AppController['settings'].searchstring = 'caliper';
    const settings = AppController['settings'];
    const products = controller['products'].bikes;
    const getProductsResult = controller['searchByProperty'](settings, products);

    const searchingObj = {
      "id": 19,
      "picture": [150],
      "product": "Cinelli Veltrix Caliper 105 Road Bike 2020",
      "count": 3,
      "year": 2020,
      "color": "Blue",
      "brand": "Cinelli",
      "frame size": "XL",
      "wheel size": "700c",
      "rating": 4,
      "category": "road",
      "price": 2404,
      "Frame": "Columbus Carbon Monocoque",
      "Fork": "Columbus 1 1/8' - 1 1/2' Monocoque",
      "Crankset": "FSA Omega MX Chainset 34/50T",
      "Rear Derailleur": null,
      "Cassette": "Shimano 105 11x 11/32T",
      "Chain": "KMC 11x",
      "Wheelset": "Vision Team 30 TLR",
      "Weight": 9
    };
    
    test('Test "searchByProperty" for searching by product name', (): void => {
      expect(getProductsResult[0]).toEqual(searchingObj)
    });
})

describe(
  'AppController\'s "setSettings" for save settings to storage', 
  (): void => {
  const controller = new AppController(AppSettings);
  const searchStringInObject = AppController['settings'].searchstring;
  const searchString = 'caliper';
  AppController['settings'].searchstring = searchString;
  controller.setSettings();
  const searchStringInStorage = (JSON.parse(localStorage.getItem('online-store-chagins') as string))['searchstring'];

  test('Test that searchstring in new AppController object is empty', (): void => {
    expect(searchStringInObject).not.toBeTruthy();
  });

  test('Test that searchstring in AppController object is match with example', (): void => {
    expect(AppController['settings'].searchstring).toBe(searchString);
  });

  test('Test that searchstring in AppController object is match with storage', (): void => {
    expect(AppController['settings'].searchstring).toBe(searchStringInStorage);
  });
})