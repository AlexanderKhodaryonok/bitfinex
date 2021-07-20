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
      return parsedOrders.map(getOrder);
    }
    const parsedOrder: IOrder = getOrder(parsedOrders);
    return [parsedOrder];
  }
  return [];
}

export function sortAsks(array: any[], key: string) {
  array.sort(function (a, b) {
    if (a[key] < b[key]) {
      return 1;
    }
    if (a[key] > b[key]) {
      return -1;
    }
    return 0;
  });
  return array;
}

export function sortBids(array: any[], key: string) {
  array.sort(function (a, b) {
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  });
  return array;
}

interface IOrdersHandler {
  data: string;
  asks: IFullOrder[];
  bids: IFullOrder[];
}

function getIndex(arr: IOrder[], price: number) {
  return arr.findIndex((item: IOrder) => item.price === price);
}

function addItem(orders: IOrder[], order: IOrder, price: number) {
  const index = getIndex(orders, price);
  if (index >= 0) {
    orders[index] = order;
  } else {
    orders.push(order);
  }
}

export function ordersHandler({ data, asks, bids }: IOrdersHandler): any {
  const orders = normalizeOrders(data);
  const newBids: IFullOrder[] = [...bids];
  const newAsks: IFullOrder[] = [...asks];
  orders.forEach((order: any) => {
    const { amount, count, price } = order;
    if (count > 0 && amount > 0) {
      addItem(newBids, order, price);
    }
    if (amount < 0 && count > 0) {
      addItem(newAsks, order, price);
    }
    if (count === 0 && amount === 1) {
      const index = newBids.findIndex((item: IOrder) => item.price === price);
      newBids.splice(index, 1);
    }
    if (count === 0 && amount === -1) {
      const index = asks.findIndex((item: IOrder) => item.price === price);
      asks.splice(index, 1);
    }
  });
  const sortedAsks = sortAsks(removeMinus(newAsks), "price").splice(0, 30);
  const sortedBids = sortBids(newBids, "price").splice(0, 30);
  const { changedOrders: changedAsks, maxTotal: maxTotalAsk } = addTotal(
    sortedAsks
  );
  const { changedOrders: changedBids, maxTotal: maxTotalBid } = addTotal(
    sortedBids
  );

  return { changedAsks, changedBids, maxTotalAsk, maxTotalBid };
}

interface RAddTotal {
  changedOrders: IFullOrder[];
  maxTotal: number;
}

function addTotal(orders: IFullOrder[]): RAddTotal {
  let currentTotal = 0;
  const changedOrders = orders.map(
    (order: IOrder): IFullOrder => {
      const { amount } = order;
      currentTotal = amount! + currentTotal;
      return {
        ...order,
        total: Math.round(currentTotal * 10000) / 10000,
      };
    }
  );
  const maxTotal = changedOrders[changedOrders.length - 1]?.total;
  return { changedOrders, maxTotal };
}

function removeMinus(newAsks: IOrder[]) {
  return newAsks.map((order: IOrder) => {
    if (order.amount?.toString()[0] === "-") {
      const formattedAmount = order.amount
        ?.toString()
        .split("")
        .splice(1)
        .join("");
      return {
        ...order,
        amount: Number(formattedAmount),
      };
    }
    return order;
  });
}

export function getChartItemWidth(maxTotal: number, total: number): number {
  if (maxTotal) {
    const width = (total * 100) / maxTotal;
    return width;
  }
  return 0;
}
