import styles from "@styles/Components/Guest/Global/BlueButton.module.scss";

export default function BlueButton(props) {
    return (
        <div style={{marginLeft:"10px"}}>
        <button {...props} className={[styles.BlueButton, props.className].join(' ')} disabled={props.disabled}>
            {props.children}
        </button>
        </div>

    );
}