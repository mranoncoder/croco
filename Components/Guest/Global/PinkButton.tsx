import styles from "@styles/Components/Guest/Global/PinkButton.module.scss";

export default function PinkButton(props) {
    return (
        <button {...props} className={[styles.PinkButton, props.className].join(' ')} disabled={props.disabled}>
            {props.children}
        </button>
    );
}