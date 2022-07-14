import { API } from 'nouislider';

export interface IProduct {
  id: number;
  picture: number[];
  product: string;
  count: number;
  year: number;
  color: string;
  brand: string;
  'frame size': string;
  'wheel size': string;
  rating: number;
  category: string;
  price: number;
  Frame: string | null;
  Fork: string | null;
  Crankset: string | null;
  'Rear Derailleur': string | null;
  Cassette: string | null;
  Chain: string | null;
  Wheelset: string | null;
  Weight: number | null;
}

export interface IProducts {
  total: number;
  bikes: IProduct[];
}

export type sortingField = 'product' | 'year' | 'rating' | 'price';
export type sortingOrder = 'ascending' | 'descending';
export type filteringField = 'category' | 'brand' | 'color' | 'frame size' | 'wheel size';
export type rangingField = 'price' | 'year' | 'rating';
export type sliderUI = { sliderId?: string; sliderInstance?: API };
export interface ISettings {
  sort: {
    fieldTypes: ['product', 'year', 'rating', 'price'];
    fieldCurrent: sortingField;
    orderTypes: ['ascending', 'descending'];
    orderCurrent: sortingOrder;
  };
  filter: {
    category: {
      types: string[];
      current: string | null;
    };
    brand: {
      types: string[];
      current: string | null;
    };
    color: {
      types: string[];
      current: string | null;
    };
    'frame size': {
      types: string[];
      current: string | null;
    };
    'wheel size': {
      types: string[];
      current: string | null;
    };
  };
  range: {
    price: {
      min: number | null;
      max: number | null;
      current: [number | null, number | null];
      format: {
        decimals: number;
        step: number;
      };
    };
    year: {
      min: number | null;
      max: number | null;
      current: [number | null, number | null];
      format: {
        decimals: number;
        step: number;
      };
    };
    rating: {
      min: number | null;
      max: number | null;
      current: [number | null, number | null];
      format: {
        decimals: number;
        step: number;
      };
    };
  };
}

export const getKeyValue =
  <T extends object, U extends keyof T>(obj: T) =>
    (key: U) =>
      obj[key];

export type callbackFun<T> = (data: T) => void;

export interface ILoader {
  load<T extends object>(data: T, callback: (data: T) => void): void;
}

export interface ILoaderConstructable {
  new (): ILoader;
}