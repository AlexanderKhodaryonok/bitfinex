import { useEffect, useRef, useState } from "react";
import { getSocketClient } from "../client/socket";
import { ordersHandler, normalizeOrders } from "../utils";
import { IFullOrder } from "./../interfaces";

interface RUseOrders {
  asks: IFullOrder[];
  bids: IFullOrder[];
  maxTotalBid: number | null;
  maxTotalAsk: number | null;
}

export function useOrders(wsUrl: string, symbol: string): RUseOrders {
  const [asks, setAsks] = useState<IFullOrder[]>([]);
  const [bids, setBids] = useState<IFullOrder[]>([]);
  const [maxTotalBid, setTotalBid] = useState<number | null>(null);
  const [maxTotalAsk, setTotalAsk] = useState<number | null>(null);
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
      ordersHandler({
        orders,
        asks,
        bids,
        setAsks,
        setBids,
        setTotalBid,
        setTotalAsk,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asks.toString(), bids.toString()]);

  return { asks, bids, maxTotalBid, maxTotalAsk };
}
