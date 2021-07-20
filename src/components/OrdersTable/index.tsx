import { loaderColor } from "../../constants";
import { IFullOrder, TOrderType } from "../../interfaces";
import { getChartItemWidth } from "../../utils";
import Loader from "../Loader";
import styles from "./styles.module.css";

interface IOrdersTable {
  title: string;
  data: IFullOrder[];
  maxTotal: number;
  type: TOrderType;
  isHideBorder?: boolean;
}

function renderRow(data: IFullOrder[], maxTotal: number, type: TOrderType) {
  return data.map(({ amount, price, count, total }: IFullOrder, index: number) => {
    if (index > 20) return undefined;
    const width = getChartItemWidth(maxTotal, total);
    return (
      <tr key={price}>
        <td>{count}</td>
        <td>{amount}</td>
        <td>{total}</td>
        <td>{price}</td>
        <td className={`${styles.chart} ${type === 'ask' ? styles.chartAsks : styles.chartBids}`} style={{width: `${width}%`}}></td>
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
  maxTotal,
  type,
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
          {renderRow(data, maxTotal, type)}
        </>
      )}
    </table>
  );
}
