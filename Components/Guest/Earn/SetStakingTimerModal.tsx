import styles from "styles/Components/Guest/Earn/SetStakingTimerModal.module.scss";
import StartStakingButton from "../Global/StartStakingButton";
import {useState} from "react";
import SelectBox from "../Global/SelectBox";

export default function SetStakingTimerModal(props) {
    console.log(props)
    const [selectedOption, setSelectedOption] = useState(null);
    const options = [

        {
            value: '30 day',
            text: '30 Day',
            rewards: "30",
            percentage: "6",
            tip: "+6%"
        },
        {
            value: '60 day',
            text: '60 Day',
            rewards: "250",
            percentage: "50",
            tip: "+50%"
        },
        {
            value: '120 day',
            text: '120 Day',
            rewards: "1125",
            percentage: "180",
            tip: "+180%"
        }
    ];

    return <div className={styles.SetStakingTimerModal}>
        <h5>Set Your Timer For Staking</h5>
        <div className={styles.ControlsContainer}>
            <SelectBox options={options} placeholder="Select Time Period" onSelect={setSelectedOption} />
            <div className={styles.TipContainer}>
                {selectedOption ? (
                    <label>Earn {selectedOption.rewards} coins per {selectedOption.value.split(' ')[1]} ({selectedOption.percentage}%)</label>
                ) : (
                    <label>Please Select One Of The Options</label>
                )}
            </div>
        </div>
        <div className={styles.ButtonContainer}>
            <StartStakingButton nftId={props.nftId} disabled={!selectedOption} days={selectedOption} onClick={() => props.onSubmit(selectedOption.value)} />
        </div>
    </div>
}