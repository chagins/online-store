import AppSettings from '../src/components/controller/appSettings';
import bikesJSON from '../src/assets/json/bikes.json';

describe('AppSettings\'s "saveSettings" method', (): void => {
  const settings = new AppSettings(bikesJSON);
  settings.saveSettings(settings['appSettings']);
  const isObjectPresent = Object.keys(localStorage).some(
    (item) => item === settings['localStorageName']
  );
  const settingsFromStorage = JSON.parse(
    localStorage.getItem(settings['localStorageName']) as string
  );

  test('Check that settings in storage is present', (): void => {
    expect(isObjectPresent).toBe(true);
  });

  test('Check that settings in storage is equal to settings in object', (): void => {
    expect(settingsFromStorage).toEqual(settings['appSettings']);
  });
});

describe('AppSettings\'s "readStorageSettings" method', (): void => {
  const settings = new AppSettings(bikesJSON);
  settings.saveSettings(settings['defaultSettings']);
  settings['readStorageSettings']();

  test('Check that settings loaded from the storage matches with object settings', (): void => {
    expect(settings['defaultSettings']).toEqual(settings['appSettings']);
  });
});

describe('AppSettings\'s "clearSettings" method', (): void => {
  const settings = new AppSettings(bikesJSON);
  const settingsBefore = settings.loadSettings();
  const maxproducts = settingsBefore.cart.maxproducts;
  settingsBefore.cart.maxproducts = 1000;
  const searchstring = settingsBefore.searchstring;
  settingsBefore.searchstring = 'trololo';
  const settingsAfter = settings.clearSettings();

  test('Check that settings before changes not matches with settings after clearSettings', (): void => {
    expect(settingsBefore).not.toEqual(settingsAfter);
  });

  test('Check that settings after clearSettings go back', (): void => {
    expect(maxproducts).toBe(settingsAfter.cart.maxproducts);
    expect(searchstring).toBe(settingsAfter.searchstring);
  });
});

describe('AppSettings\'s "collectSettings" method', (): void => {
  const settings = new AppSettings(bikesJSON);
  const colorTypesBefore = [...settings['appSettings'].filter.color.types];
  settings['collectSettings']();
  const colorTypesAfter = [...settings['appSettings'].filter.color.types];
  const colors = [
    'Green',
    'Purple',
    'Grey',
    'Olive',
    'Lime',
    'Gray',
    'Alloy',
    'Violet',
    'Multi',
    'Blue',
    'Red',
    'Black',
    'Bronze',
  ];
  const isAllColorsPresents = colors.every((item) => colorTypesAfter.includes(item));

  test('Check that collectSettings fills available options', (): void => {
    expect(colorTypesBefore).not.toEqual(colorTypesAfter);
    expect(isAllColorsPresents).toBe(true);
  });
});

describe('AppSettings\'s "setDefaultSettings" method', (): void => {
  const settings = new AppSettings(bikesJSON);
  const priceMinBefore = settings['appSettings'].range.price.min;
  const priceMaxBefore = settings['appSettings'].range.price.max;
  settings['collectSettings']();
  settings['setDefaultSettings']();
  const priceMinAfter = settings['appSettings'].range.price.min;
  const priceMaxAfter = settings['appSettings'].range.price.max;

  test('Check that before setDefaultSettings price min is null and price max is null', (): void => {
    expect(priceMinBefore).toBeNull();
    expect(priceMaxBefore).toBeNull();
  });

  test('Check that after setDefaultSettings prices values are correct', (): void => {
    expect(priceMinAfter).not.toBeNull();
    expect(priceMaxAfter).not.toBeNull();
    expect(priceMinAfter).toBeLessThan(priceMaxAfter ? priceMaxAfter : -1);
  });
});
