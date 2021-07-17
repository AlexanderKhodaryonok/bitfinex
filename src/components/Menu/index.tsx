import { NavLink } from "react-router-dom";
import { IRoute } from "../../interfaces";
import styles from './styles.module.css';

interface IMenu {
  routes: IRoute[];
}

function renderItems(routes: IRoute[]) {
  return routes.map(({ url, title }: IRoute) => (
    <li>
      <NavLink activeClassName={styles.active} to={url}>{title}</NavLink>
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
