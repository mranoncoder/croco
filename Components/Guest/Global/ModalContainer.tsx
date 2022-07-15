import styles from "@styles/Components/Guest/Global/ModalContainer.module.scss";

export default function ModalContainer(props) {
    return <div className={styles.ModalContainer}>
        <div className={styles.Overlay} onClick={props.onOverlayClick} />
        <div className={styles.Modal}>
            <div className={styles.CloseButtonContainer}>
                <button onClick={props.onOverlayClick}><i className="far fa-times" /></button>
            </div>
            {props.children}
        </div>
    </div>
}