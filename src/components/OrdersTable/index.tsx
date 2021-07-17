import { IOrder } from "../../interfaces";
import styles from './styles.module.css';

interface IOrdersTable {
  title: string;
  data: IOrder[];
  isHideBorder?: boolean;
}

function renderRow(data: IOrder[]) {
  return data.map(({ amount, price, count }: IOrder) => {
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
};

export default function OrdersTable({ title, data, isHideBorder = false }: IOrdersTable) {
  return (
    <table className={`${styles.container} ${isHideBorder && styles.hideSideBorder}`}>
      <caption>{title}</caption>
      {renderHead()}
      {renderRow(data)}
    </table>
  );
}
