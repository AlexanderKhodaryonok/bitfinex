import { IRoute } from './../interfaces/index';
export const wsUrl = 'wss://api-pub.bitfinex.com/ws/2';

export const routes: IRoute[] = [
  {
    url: '/about',
    title: 'About',
  },
  {
    url: '/order-book',
    title: 'Book Orders',
  }
]
