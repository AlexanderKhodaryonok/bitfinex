import { useAppSelector } from "../../store";
import { getAboutData } from "../../store/reducers/aboutReducer";
import styles from "./styles.module.css";

function About() {
  const data = useAppSelector((state) => getAboutData(state));
  return (
    <div className={styles.container}>
      <h1>{data}</h1>
    </div>
  );
}

export default About;
