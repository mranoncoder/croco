import styles from "@styles/Components/Guest/Global/BlueButton.module.scss";

export default function BlueButton(props) {
    return (
        <button {...props} className={[styles.BlueButton, props.className].join(' ')}>
            {props.children}
        </button>
    );
}