import OrdersTable from "../../components/OrdersTable";
import { useOrders } from "../../hooks/useOrders";
import { wsUrl } from "../../constants";
import styles from './styles.module.css';

function OrderBook() {
  const { asks, bids } = useOrders(wsUrl, "tBTCUSD");
  return (
    <div className={styles.container}>
      <OrdersTable data={asks} title="ask" />
      <OrdersTable data={bids} title="bids" isHideBorder />
    </div>
  );
}

export default OrderBook;
