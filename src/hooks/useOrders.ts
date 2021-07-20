import { useEffect, useRef, useState } from "react";
import { getSocketClient } from "../client/socket";
import { ordersHandler } from "../utils";
import { IFullOrder } from "./../interfaces";

interface RUseOrders {
  asks: IFullOrder[];
  bids: IFullOrder[];
  maxTotalBid: number;
  maxTotalAsk: number;
}

export function useOrders(wsUrl: string, symbol: string): RUseOrders {
  const [asks, setAsks] = useState<IFullOrder[]>([]);
  const [bids, setBids] = useState<IFullOrder[]>([]);
  const [maxTotalBid, setTotalBid] = useState<number>(0);
  const [maxTotalAsk, setTotalAsk] = useState<number>(0);
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
    ws.current.onmessage = ({ data }: MessageEvent) => {
      const {
        changedAsks,
        changedBids,
        maxTotalAsk,
        maxTotalBid,
      } = ordersHandler({
        data,
        asks,
        bids,
      });
      setAsks(changedAsks);
      setBids(changedBids);
      setTotalAsk(maxTotalAsk);
      setTotalBid(maxTotalBid);
    };
  }, [asks, bids]);

  return { asks, bids, maxTotalBid, maxTotalAsk };
}
