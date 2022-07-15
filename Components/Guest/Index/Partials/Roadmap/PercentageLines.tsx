import styles from "styles/Components/Guest/Index/Partials/Roadmap/PercentageLines.module.scss";

export default function PercentageLines() {
  return <>
    <div className={styles.PercentageLine} style={{ bottom: "100%" }} />
    <div className={styles.PercentageLine} style={{ bottom: "80%" }} />
    <div className={styles.PercentageLine} style={{ bottom: "60%" }} />
    <div className={styles.PercentageLine} style={{ bottom: "40%" }} />
    <div className={styles.PercentageLine} style={{ bottom: "20%" }} />
    <div className={styles.PercentageLine} style={{ bottom: "0%" }} />
  </>
}