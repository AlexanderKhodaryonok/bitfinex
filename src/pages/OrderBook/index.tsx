import OrdersTable from "../../components/OrdersTable";
import { useOrders } from "../../hooks/useOrders";
import { wsUrl } from "../../constants";
import styles from './styles.module.css';
import PageTitle from "../../components/PageTitle";

function OrderBook() {
  const { asks, bids } = useOrders(wsUrl, "tBTCUSD");
  return (
    <div className={styles.container}>
      <PageTitle title='Order Book' />
      <div className={styles.table_wrapper}>
        <OrdersTable data={asks} title="ask" />
        <OrdersTable data={bids} title="bids" isHideBorder />
      </div>
    </div>
  );
}

export default OrderBook;
