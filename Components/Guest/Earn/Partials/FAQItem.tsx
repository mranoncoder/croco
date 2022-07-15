import styles from "styles/Components/Guest/Earn/Partials/FAQItem.module.scss";
import {IFAQItem} from "types";
import {useState} from "react";

export default function FAQItem(props: IFAQItem & {active? : boolean, style: object}) {
    const [isActive, setIsActive] = useState(props.active || false);

    const toggleActive = (e) => {
        setIsActive(a => !a);
    }

    return <div className={isActive ? [styles.FAQItem, styles.Active].join(' ') : styles.FAQItem} onClick={toggleActive} style={props.style}>
        <div className={styles.QuestionContainer}>
            <h6 className={styles.Question}>{props.question}</h6>
            <i className="fa fa-chevron-down float-end" />
        </div>
        <div className={styles.DescriptionContainer}>
            <p className={styles.Description}>{props.description}</p>
        </div>
    </div>
}