import { useAppSelector } from "../../store";
import { getAboutData } from "../../store/reducers/aboutReducer";
import styles from "./styles.module.css";

function About() {
  const data = useAppSelector((state) => getAboutData(state));
  return <div className={styles.container}>{data}</div>;
}

export default About;
