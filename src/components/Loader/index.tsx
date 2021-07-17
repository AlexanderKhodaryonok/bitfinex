import LoaderComponent from "react-loader-spinner";
import styles from './styles.module.css';

type TLoader = "Audio" | "BallTriangle" | "Bars" | "Circles" | "Grid" | "Hearts" | "Oval" | "Puff" | "Rings" | "TailSpin" | "ThreeDots" | "Watch" | "RevolvingDot" | "Triangle" | "Plane" | "MutatingDots" | "CradleLoader";

interface ILoader {
  type: TLoader;
  color: string
}

export default function Loader({ type, color }: ILoader) {
  return (
    <div className={styles.container}>
      <LoaderComponent type={type} color={color} />
    </div>
  );
}
