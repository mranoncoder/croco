import styles from "@styles/Components/Guest/Global/SelectBox.module.scss";
import {useState} from "react";

export default function SelectBox(props) {
    const [boxOpen, setBoxOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const select = option => {
        setBoxOpen(false);
        setSelectedOption(option);
        props.onSelect(option);
    }

    const classes = [styles.SelectBox, props.className];

    if(boxOpen)
        classes.push(styles.Active);

    const toggleSelectBox = e => {
        setBoxOpen(!boxOpen);
    }

    return (
        <div {...props} className={classes.join(' ')} onClick={toggleSelectBox}>
            <label className={selectedOption ? 'text-primary' : ''}>{selectedOption ? selectedOption.text : props.placeholder}</label>
            <span><i className="fa fa-chevron-down float-end"/></span>
            {boxOpen ? (
                <div className={styles.Options}>
                    {props.options.map(option => (
                        <div key={option.value} className={styles.Option} onClick={() => select(option)}>
                            <span className={styles.Title}>{option.text}</span>
                            {option.tip ? (
                                <span className={styles.Tip}>{option.tip}</span>
                            ) : ''}
                        </div>
                    ))}
                </div>
            ) : ''}
        </div>
    );
}