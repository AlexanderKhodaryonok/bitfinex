export interface IOrder {
  price: number | null;
  count: number | null;
  amount: number | null;
}

export interface IFullOrder extends IOrder {
  total: number
}

export interface IRoute {
  title: string;
  url: string;
}

export type TOrderType = 'ask' | 'bid';
