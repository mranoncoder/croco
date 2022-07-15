import styles from "styles/Components/Guest/Earn/CountDownTimer.module.scss";
import Countdown from "react-countdown";

export default function CountDownTimer(props) {
    const doubleDigit = digit => {
        return digit < 10 && digit >= 0 ? '0' + digit : digit;
    }

    const CDT = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            setTimeout(props.onComplete, 1000);
            return <div className={styles.Timer}>
                <span>
                    <span>E</span>
                    <label>Days</label>
                </span>
                <span>
                    <span>N</span>
                    <label>Hours</label>
                </span>
                <span>
                    <span>D</span>
                    <label>Minutes</label>
                </span>
                <span>
                    <span>ED</span>
                    <label>Seconds</label>
                </span>
            </div>;
        } else {
            return (
                <div className={styles.Timer}>
                    <span>
                        <span>{doubleDigit(days)}</span>
                        <label>Days</label>
                    </span>
                    <span>
                        <span>{doubleDigit(hours)}</span>
                        <label>Hours</label>
                    </span>
                    <span>
                        <span>{doubleDigit(minutes)}</span>
                        <label>Minutes</label>
                    </span>
                    <span>
                        <span>{doubleDigit(seconds)}</span>
                        <label>Seconds</label>
                    </span>
                </div>
            );
        }
    };

    return <Countdown date={new Date(props.value)} renderer={CDT} />
}