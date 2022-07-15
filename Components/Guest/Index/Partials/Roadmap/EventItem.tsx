import styles from "styles/Components/Guest/Index/Partials/Roadmap/EventItem.module.scss";
import { IEventItem } from "types";

export default function EventItem(props: IEventItem) {
  var newStyle = {bottom: `calc(${props.done} + 30px)`, filter: 'blur(3px)'}
  if (props.month === 'July'){
    newStyle = {bottom: `calc(${props.done} + 30px)`, filter:''}
  }
  return <div className={styles.EventItem}>
    <div className={styles.Description} style={newStyle}>{props.description}</div>
    <div className={styles.Percentage} style={{ top: `calc(300px - ${props.done})` }}></div>
    <div className={styles.Time}>
      <div>{props.month}</div>
      <div>{props.year}</div>
    </div>
  </div>
}