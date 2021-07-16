import { useEffect, useRef, useState } from "react";
import { getSocketClient } from "../client/socket";
import { itemsHandler, normalizeOrders } from "../utils";
import { IOrder } from "./../interfaces";

interface RUseOrders {
  asks: IOrder[];
  bids: IOrder[];
}

export function useOrders(wsUrl: string, symbol: string): RUseOrders {
  const [asks, setAsks] = useState<IOrder[]>([]);
  const [bids, setBids] = useState<IOrder[]>([]);
  const ws: any = useRef(null);
  useEffect(() => {
    ws.current = getSocketClient(wsUrl);
    ws.current.onopen = () => {
      let msg = JSON.stringify({
        event: "subscribe",
        channel: "book",
        symbol,
      });
      ws.current.send(msg);
    };
    ws.current.onclose = () => console.log("ws closed");
    return () => {
      ws.current.close();
    };
  }, [symbol, wsUrl]);

  useEffect(() => {
    if (!ws.current) return;
    ws.current.onmessage = (e: any) => {
      const orders = normalizeOrders(e.data);
      itemsHandler({ orders, asks, bids, setAsks, setBids });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asks.toString(), bids.toString()]);

  return { asks, bids };
}

