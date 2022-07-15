import styles from "@styles/Components/Guest/Global/StartStakingButton.module.scss";
import Image from "next/image";
import icon from "/images/icons/timer.svg";
import { useWeb3React } from "@web3-react/core";
import useStake from "hooks/useStake"
import { useState } from "react";
import {LoaderIcon} from '../../LoaderIcon/LoaderIcon'

export default function StartStakingButton(props) {
    const { account, chainId } = useWeb3React()
    const stake = useStake()
    const [buttonName, setButtonName] = useState('Start Staking')
    const [start, setStart] = useState(false)
    const handleStake = async () => {

        let packageIndex;
        if (!props.days){
            return
        }
        const day = props.days.value
        if(day == '30 day'){
            packageIndex = '0'
        }
        if(day == '60 day'){
            packageIndex = '1'
        }
        if(day == '120 day'){
            packageIndex = '2'
        }
        const nftId  = props.nftId
        setStart(true)
        try{
            await stake(account, nftId, packageIndex)
            setStart(false)
            props.onClick()
        }
        catch{
            setStart(false)
        }
    }

    return (
        <button onClick={handleStake} className={[styles.StartStakingButton, props.className].join(' ')}>
            <span>
              <Image src={icon}/>
              {buttonName} {start ? LoaderIcon : ''}
            </span>
        </button>
    );
}