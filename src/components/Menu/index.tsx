import { Link } from "react-router-dom";
import { IRoute } from "../../interfaces";
import styles from './styles.module.css';

interface IMenu {
  routes: IRoute[];
}

function renderItems(routes: IRoute[]) {
  return routes.map(({ url, title }: IRoute) => (
    <li>
      <Link to={url}>{title}</Link>
    </li>
  ));
}

export default function Menu({ routes }: IMenu) {
  return (
    <nav className={styles.container}>
      <ul>{renderItems(routes)}</ul>
    </nav>
  );
}
