import styles from "styles/Components/Guest/Index/Partials/Roadmap/PercentageItem.module.scss";

export default function PercentageItem(props: { value: string }) {

  return <div className={styles.PercentageItem} style={{ bottom: props.value }}>
    {props.value}
  </div>
}