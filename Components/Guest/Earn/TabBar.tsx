import styles from "styles/Components/Guest/Earn/TabBar.module.scss";
import {useState} from "react";

export default function TabBar(props) {
    const [activeCls, setActiveCls] = useState({unstake: '', stake: styles.Active});

    const activateTab = type => {
        setActiveCls(cls => {
            return {
                unstake: '',
                stake: '',
                [type]: styles.Active
            }
        });

        props.onChange(type);
    }

    return <div className={styles.TabBar}>
        <span role="button" onClick={() => activateTab('stake')} className={[styles.TabItem, activeCls.stake].join(' ')}>Stake</span>
        <span role="button" onClick={() => activateTab('unstake')} className={[styles.TabItem, activeCls.unstake].join(' ')}>UnStake</span>
    </div>
}