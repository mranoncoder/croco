import styles from "styles/Components/Guest/Earn/InfoBox.module.scss";

export default function InfoBox(props) {
    return <div className={styles.InfoBox}>
        {props.children}
    </div>
}