import styles from "styles/Components/Guest/Earn/StakableNFTItem.module.scss";
import {IStakableNFTItem} from "types";
import Image from "next/image";
import BlueButton from "../Global/BlueButton";
import PinkButton from "../Global/PinkButton";
import RewardButton from "../Global/RewardButton";
import CountDownTimer from "./CountDownTimer";
import {useEffect, useState} from "react";
import useIsApproved from "hooks/useIsApproved";
import { useWeb3React } from '@web3-react/core';
import useApprove from "hooks/useApprove"
import {LoaderIcon} from '../../LoaderIcon/LoaderIcon'
import useUnStake from 'hooks/useUnStake'
import useGetReward from 'hooks/useGetReward'
import useEarn from 'hooks/useEarn'
import { fromWei } from 'utils/wei'

export default function StakableNFTItem(props: IStakableNFTItem & { style?: object,nftStatus, getType, onStake,  nftID, onUnStake, onReward, onApprove }) {
    const { account, chainId } = useWeb3React()
    const approve = useApprove(account)
    const earn = useEarn()
    const isApproved = useIsApproved(account)
    const [approveName, setApproveName] =  useState('Approve')
    const [approvIng, setApproving] = useState(false)
    const [unStakingIng, setUnStaking] = useState(false)
    const [unStakeName, setUnStakeName] =  useState('UnStake')
    const [rewardIng, setRewarding] = useState(false)
    const [earnValue, setEarnValue] = useState(false)
    const [value, setValue] = useState(0)
    const unStake_ = useUnStake(account)
    const getReward = useGetReward(account)
    const shouldShowOverlay = (nftItem: IStakableNFTItem) => {
        return props.getType(nftItem) === 'stake' && new Date(nftItem.stakeExpireDate).toISOString() > new Date().toISOString();
    }

    const [showOverlay, setShowOverlay] = useState(shouldShowOverlay(props));
    const [approved, setApproved] = useState(null)

    function financial(x) {
        return Number.parseFloat(x).toFixed(0);
      }

    const onComplete = () => {
        setShowOverlay(shouldShowOverlay(props));
    };

    const checkApprove = async () => {
        if(props.status == 'STAKED'){
            setApproved(true)
            await checkEarn()
        }
        else{
            setApproved(await isApproved(props.nftID))
        }
    }

    useEffect(() => {
        const interval = setInterval( async() => {
            if(props.nftStatus == 'STAKED'){
                const res = await earn(props.nftID)
                setEarnValue(res.res)
                // @ts-ignore
                setValue(financial(fromWei(res.value)))
            }

        }, 1000);
        return () => clearInterval(interval);
    }, [])
    const checkEarn = async () => {

    }

    const handleUnStake = async (nft_id, ) => {
        try{
            setUnStakeName('UnStaking')
            setUnStaking(true)
            await unStake_(nft_id)
            setUnStakeName('UnStake')
            setUnStaking(false)
            props.onUnStake(nft_id)
        }
        catch{
            setUnStakeName('UnStake')
            setUnStaking(false)
        }
    }

    const handleApprove = async () => {
        setApproveName('Approving')
        setApproving(true)
        try{
            await approve(props.nftID)
            setApproveName('Approve')
            setApproving(false)
            await checkApprove()
            await props.onApprove()
        }
        catch{
            setApproveName('Approve')
            setApproving(false)
        }
    }

    const handleReward = async (nft_id: number) => {
        try{
          setRewarding(true)
          await getReward(nft_id)
          setRewarding(false)
          props.onReward()
        }
        catch{
            setRewarding(false)
        }
    }

    useEffect(() => {
        checkApprove()
    }, [account])

    return <div className="col-lg-4 col-md-6 m-auto mb-3" style={{ maxWidth: '400px', ...props.style }}>
        <div className={styles.StakableNFTItem}>
            <div className={styles.ImageContainer}>
                <Image src={props.image} width={400} height={278} />
            </div>
            <div className={styles.ButtonsContainer}>
                <div className="row">
                    {approved ?
                    <>
                    {props.nftStatus != 'STAKED'
                    ?
                    <div className="col-12">
                        <BlueButton onClick={props.onStake} disabled={props.getType(props) === 'stake'}>Stake</BlueButton>
                    </div>
                    :
                    <div style={{display:'flex'}}>
                        <div className="col-6">
                            <PinkButton onClick={() => handleUnStake(props.nftID)} disabled={props.getType(props) === 'unstake' || showOverlay}>
                            <span>{unStakeName} {unStakingIng ? LoaderIcon : ''}</span></PinkButton>
                        </div>
                        <div className="col-6">
                            <RewardButton onClick={() => handleReward(props.nftID)} disabled={ earnValue }>
                            <span>Reward {rewardIng ? LoaderIcon : ''}</span>
                            </RewardButton>
                        </div>
                    </div>
                    }
                    </>
                    : <BlueButton onClick={handleApprove} ><span>

                    {approveName} {approvIng ? LoaderIcon : ''}
                    </span></BlueButton>}
                </div>
            </div>
            <div className={styles.TipContainer}>
            {props.nftStatus == 'STAKED' ?
            'Earn: '
             + value
            :
            ''
            }
              {/* <label>Earn {props.earnPerDay} coin(s) per day</label> */}
            </div>
            {showOverlay ? (
                <div className={styles.OverlayTimer}>
                    <div className={styles.TimerContainer}>
                        <div className={styles.Text}>
                            Stake limitation ends in
                        </div>
                        <CountDownTimer value={props.stakeExpireDate} onComplete={onComplete} />
                    </div>
                </div>
            ) : ''}
        </div>
    </div>
}
