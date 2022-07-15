import styles from "styles/Components/Guest/Index/Partials/Roadmap/PercentageTexts.module.scss";
import PercentageItem from "./PercentageItem";

export default function PercentageTexts() {
  return <div className={styles.Percentage}>
    <PercentageItem value="100%" />
    <PercentageItem value="80%" />
    <PercentageItem value="60%" />
    <PercentageItem value="40%" />
    <PercentageItem value="20%" />
    <PercentageItem value="0%" />
  </div>
}