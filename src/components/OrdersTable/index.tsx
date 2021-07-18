import { loaderColor } from "../../constants";
import { IFullOrder } from "../../interfaces";
import Loader from "../Loader";
import styles from "./styles.module.css";

interface IOrdersTable {
  title: string;
  data: IFullOrder[];
  isHideBorder?: boolean;
}

function renderRow(data: IFullOrder[]) {
  return data.map(({ amount, price, count, total }: IFullOrder, index: number) => {
    if (index > 20) return undefined;
    return (
      <tr key={price}>
        <td>{count}</td>
        <td>{amount}</td>
        <td>{total}</td>
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
      <td>Total</td>
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
        <Loader type="Bars" color={loaderColor} />
      ) : (
        <>
          {renderHead()}
          {renderRow(data)}
        </>
      )}
    </table>
  );
}
