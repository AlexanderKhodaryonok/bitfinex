import Menu from "../../components/Menu";
import { routes } from "../../constants";
import styles from "./styles.module.css";

interface IMainLayout {
  children: JSX.Element;
}

export default function MainLayout({ children }: IMainLayout) {
  return (
    <div className={styles.container}>
      <Menu routes={routes} />
      {children}
    </div>
  );
}
