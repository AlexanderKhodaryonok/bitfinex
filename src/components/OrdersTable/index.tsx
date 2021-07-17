import { IOrder } from "../../interfaces";
import Loader from "../Loader";
import styles from "./styles.module.css";

interface IOrdersTable {
  title: string;
  data: IOrder[];
  isHideBorder?: boolean;
}

function renderRow(data: IOrder[]) {
  return data.map(({ amount, price, count }: IOrder, index: number) => {
    if (index > 20) return undefined;
    return (
      <tr key={price}>
        <td>{count}</td>
        <td>{amount}</td>
        <td>{price}</td>
      </tr>
    );
  });
}

function renderHead() {
  return (
    <tr>
      <td>Count</td>
      <td>Amount</td>
      <td>Price</td>
    </tr>
  );
}

export default function OrdersTable({
  title,
  data,
  isHideBorder = false,
}: IOrdersTable) {
  return (
    <table
      className={`${styles.container} ${isHideBorder && styles.hideSideBorder}`}
    >
      <caption>{title}</caption>
      {data.length === 0 ? (
        <Loader type="Bars" color="white" />
      ) : (
        <>
          {renderHead()}
          {renderRow(data)}
        </>
      )}
    </table>
  );
}
