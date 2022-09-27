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

export interface ISettings {
  sortField: sortingField;
  sortOrder: sortingOrder;
}

export type callbackFun<T> = (data: T) => void;

export interface ILoader {
  load<T extends object>(data: T, callback: (data: T) => void): void;
}

export interface ILoaderConstructable {
  new (): ILoader;
}
