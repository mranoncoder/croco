import styles from "@styles/Components/Guest/Global/ConnectWalletButton.module.scss";
import Image from "next/image";
import connectIcon from "/images/icons/connect-wallet.svg";
import logOutIcon from 'images/icons/logout-wallet.svg'
import { useWeb3React } from '@web3-react/core'
import WalletModal from '../../modal/WalletModal'
import { useBridge } from '../../../state/bridge/hooks'
import { validChains } from '../../../constants/settings'
import { addRPC } from '../../../utils/addRPC'
import { NameChainMap } from '../../../constants/chainsMap'
import React, { useEffect, useState } from 'react'
import { UnsupportedChainIdError } from '@web3-react/core'
import Swal from 'sweetalert2'

export default function ConnectWalletButton(props) {

  const [open, setOpen] = useState(false)
  const { account, chainId, deactivate, error } = useWeb3React()
  const bridge = useBridge()
  const wrongNetwork = !validChains.includes(chainId)

  let validChainId = null
  if (bridge.fromChain) {
    if (bridge.fromChain.id !== chainId) validChainId = bridge.fromChain.id
  }

  // if (wrongNetwork || validChainId) {
  //   return Swal.fire({
  //     text:"Worng NetWork",
  //     icon: 'error',
  //     showConfirmButton: false,
  //     timer: 1500
  //   })
  // } 

  const handleConnectWallet = () => {
    console.log('handle connect')
    setOpen(true)
  }

  const handleDisconnect = async () => {
    localStorage.setItem('walletConnectedFlag', 'false')
    try{
      deactivate()
    }
    catch{

    }
  }

  useEffect(() => {
    if(account){
    localStorage.setItem('walletConnectedFlag', 'true')
    Swal.fire({
      text:"Wallet is connected",
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    })
  }
  }, [account])


  let contentBtn: JSX.Element;
  if (!account && !(error instanceof UnsupportedChainIdError))
    contentBtn = (
      <button className={[styles.ConnectWalletButton, props.className].join(' ')}
      onClick={handleConnectWallet}
      >
          <span>
          <Image src={connectIcon}/>
          Connect Wallet
        </span>
      </button>
    )
  else if (wrongNetwork || validChainId || error instanceof UnsupportedChainIdError) {
    contentBtn = (
      <button className={[styles.ConnectWalletButton, props.className].join(' ')}

        onClick={() =>
          wrongNetwork ? addRPC(bridge.fromChain ? bridge.fromChain.id : validChains[0]) : addRPC(validChainId)
        }
      >

          {wrongNetwork
            ? ` Switch to ${NameChainMap[bridge.fromChain ? bridge.fromChain.id : validChains[0]]}`
            : ` Switch to ${NameChainMap[validChainId]}`}
      </button>
    )
  } 

  else{
    contentBtn = (
    <button className={[styles.ConnectWalletButton, props.className].join(' ')}>
    <span>
      <Image  onClick={handleDisconnect} src={logOutIcon} width="30"/>
      {account.slice(1, 6) + '...' + account.slice(account.length - 5)}
    </span>
   </button>
    )
  }


  return (
      <>
        {contentBtn}

        <WalletModal
          open={open}
          hide={() => {
            setOpen(!open)
          }}
        />

      </>
  )
}
