import { IFullOrder, IOrder } from "./../interfaces/index";

function getOrder(data: number[]): IOrder {
  const [price, count, amount] = data;
  const normalizedOrder: IOrder = {
    price,
    count,
    amount,
  };
  return normalizedOrder;
}

export function normalizeOrders(data: string): IOrder[] | [] {
  const parsedData = JSON.parse(data);
  if (
    parsedData.length &&
    parsedData[1].length &&
    typeof parsedData[1] === "object"
  ) {
    const parsedOrders = parsedData[1];
    if (parsedOrders[0].length) {
      const normalizedOrders = parsedOrders.map((order: number[]) => {
        const parsedOrders: IOrder = getOrder(order);
        return parsedOrders;
      });
      return normalizedOrders;
    } else {
      const parsedOrder: IOrder = getOrder(parsedOrders);
      return [parsedOrder];
    }
  }
  return [];
}

export function sort(array: any[], key: string, isReverse = false) {
  const arrayCopy = [...array];
  arrayCopy.sort(function (a, b) {
    if (a[key] < b[key]) {
      return isReverse ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return isReverse ? 1 : -1;
    }
    return 0;
  });
  return arrayCopy;
}

interface IItemsHandler {
  orders: IOrder[];
  asks: IFullOrder[];
  bids: IFullOrder[];
  setAsks: (asks: IFullOrder[]) => void;
  setBids: (bids: IFullOrder[]) => void;
}

function getIndex(arr: IOrder[], price: number) {
  const index = arr.findIndex((item: IOrder) => {
    return item.price === price;
  });
  return index;
}

function addItem(orders: IOrder[], order: IOrder, price: number) {
  const index = getIndex(orders, price);
  if (index >= 0) {
    orders[index] = order;
  } else {
    orders.push(order);
  }
}

export function itemsHandler({
  orders,
  asks,
  bids,
  setAsks,
  setBids,
}: IItemsHandler) {
  const newBids: IFullOrder[] = [...bids];
  const newAsks: IFullOrder[] = [...asks];
  orders.forEach((order: any) => {
    const { amount, count, price } = order;
    if (count > 0) {
      if (amount > 0) {
        addItem(newBids, order, price)
      } else if (amount < 0) {
        addItem(newAsks, order, price)
      }
    } else if (count === 0) {
      if (amount === 1) {
        const index = newBids.findIndex((item: IOrder) => {
          return item.price === price;
        });
        newBids.splice(index, 1);
      } else if (amount === -1) {
        const index = asks.findIndex((item: IOrder) => {
          return item.price === price;
        });
        asks.splice(index, 1);
      }
    }
  });
  const sortedAsks = sort(removeMinus(newAsks), "price").splice(0, 30);
  const sortedBids = sort(newBids, "price", true).splice(0, 30);
  setAsks(addTotal(sortedAsks));
  setBids(addTotal(sortedBids));
}

function addTotal(orders: IOrder[]): IFullOrder[] {
  let currentTotal = 0;
  return orders.map((order: IOrder): IFullOrder => {
    const { amount } = order;
    currentTotal = amount! + currentTotal;
    return {
      ...order,
      total: Math.round(currentTotal * 10000) / 10000,
    }
  })
}

function removeMinus(newAsks: IOrder[]) {
  return newAsks.map((order: IOrder) => {
    if(order.amount?.toString()[0] === '-') {
      const formattedAmount = order.amount?.toString().split('').splice(1).join('');
      return {
        ...order,
        amount: Number(formattedAmount)
      }
    }
    return order;
  })
}
