import styles from "@styles/Components/Guest/Global/MintButton.module.scss";
import Image from "next/image";
import mintIcon from "/images/icons/mint.svg";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {LoaderIcon} from '../../LoaderIcon/LoaderIcon'
import useMinterNft from '../../../hooks/useMinterNft'
import { useWeb3React } from '@web3-react/core';

export default function ConnectWalletButton(props) {
    const { account, chainId} = useWeb3React()
    const mint = useMinterNft(account, chainId, props.editions, account)
    const  [mintName, setMintName]= useState('Mint');
    const [minting, setMinting]= useState(false)
    const handleMint = async () => {
        if(!account){
            return Swal.fire({
                text:"Wallet is not connect",
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            })           
        }
        if (props.editions > 3){
        return Swal.fire({
            text:"You can't select more than 3.",
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
        })
        }

        setMinting(true)
        setMintName('Minting')
        try{
            await mint()
            setMintName('Mint')
            setMinting(false)
        }
        catch{
            setMintName('Mint')
            setMinting(false)   
        }
    }



    return (
        <>
            {chainId != 4 && account ? <button className={styles.MintButton} >
                <span>
                <Image src={mintIcon} />
                Wrong NetWork
                </span>
            </button> :
                <button className={styles.MintButton} onClick={handleMint}>
                <span>
                <Image src={mintIcon} />
                {mintName} {minting ? LoaderIcon : ''}
                </span>
            </button>
            }

                {/* <div style={{border:"1px solid #ccc", padding:'20px', borderRadius:"5px", marginTop:"10px"}}>
                    <p>Minted!</p>
                    <a style={{color:"#3dc1df"}} href="{exploreAddress}">View Transaction</a>
                </div> */}
            
        </>
    );
}
