import Guest from "Components/Layouts/Guest";
import styles from "styles/Pages/Earn.module.scss";
import {IEarnSummaryInfo, IFAQItem, ISocialItem, IStakableNFTItem, ISupplyInfo} from "types";
import TopBar from "../Components/Guest/Earn/TopBar";
import TabBar from "../Components/Guest/Earn/TabBar";
import {useEffect, useState} from "react";
import StakableNFTItem from "../Components/Guest/Earn/StakableNFTItem";
import crocodileNFT from "../images/crocodile-nft.png";
import SetStakingTimerModal from "../Components/Guest/Earn/SetStakingTimerModal";
import ModalContainer from "../Components/Guest/Global/ModalContainer";
import FAQs from "../Components/Guest/Earn/FAQs";
import SupplyInfoBox from "../Components/Guest/Earn/SupplyInfoBox";
import useTokenOfUser from '../hooks/useTokenOfUser';
import useUserStakedNTFs from '../hooks/useUserStakedNFTs'
import { useWeb3React } from '@web3-react/core';
export default function Earn(
    { socials, stakableNFTs, faqs, summaryInfo, supplyInfo }:
    { socials: Array<ISocialItem>,
      stakableNFTs: Array<IStakableNFTItem>,
      faqs: Array<IFAQItem>,
      summaryInfo: IEarnSummaryInfo,
      supplyInfo: ISupplyInfo,
    }) {

  const { account, chainId } = useWeb3React()

  const getTokens = useTokenOfUser(account)
  const stakedTokens = useUserStakedNTFs(account)
  const [stakeCount, setStakeCount] = useState(0)

  const getType = (nft: IStakableNFTItem) => {
    return nft.status === 'NOT-STAKED' ? 'unstake' : 'stake';
  }
  
  const [nftlist, setNFTList] = useState<Array<IStakableNFTItem>>(stakableNFTs.filter((nft: IStakableNFTItem) => getType(nft) !== 'stake'));
  const [Modal, setModal] = useState(null);
  


  const getUserTokens = async () => {
    console.log('get user Tokens')
    stakableNFTs = []
    if(account && chainId == 4){
      let StakedNFT = await stakedTokens()
      console.log(StakedNFT)
      setStakeCount(StakedNFT.length)
      stakableNFTs.push(...await getTokens(), ...StakedNFT)
      console.log(stakableNFTs)
      setNFTList(stakableNFTs.filter((nft: IStakableNFTItem) => getType(nft) !== 'stake'))
    }
  }

  useEffect(() => {
    if(account){
      stakableNFTs = []
      getUserTokens()
    }
    else{
      stakableNFTs = []
      setStakeCount(0)
      setNFTList(stakableNFTs.filter((nft: IStakableNFTItem) => getType(nft) !== 'stake'))
    }

  }, [account, chainId])

  const filter = async type => {
    console.log('filter')
    stakableNFTs = []
    await getUserTokens()
    // console.log(stakableNFTs)
    setNFTList(stakableNFTs.filter((nft: IStakableNFTItem) => getType(nft) !== type));
  }

  const unpopModal = () => {
    setModal(null);
  }

  const popModal = (Component) => {
    setModal(Component);
  }

  const stakeFor = async (nft_id: number, time: string) => {
    // validate and unstake nft in database
    // const now = new Date();
    // const timeSplit = time.split(' ');
    // const unit = Number(timeSplit[0]);
    // console.log(timeSplit)
    // if(timeSplit.length !== 2 || isNaN(unit) || unit < 1)
    //   return;
    // switch(timeSplit[1].toLowerCase()) {
    //   case 'hour':
    //     now.setHours(now.getHours() + unit);
    //     break;
    //   case 'day':
    //     now.setDate(now.getDate() + unit);
    //     break;
    //   case 'week':
    //     now.setDate(now.getDate() + (unit * 7));
    //     break;
    //   case 'month':
    //     now.setMonth(now.getMonth() + unit);
    //     break;
    // }
    // setNFTList(nftlist.map((nft: IStakableNFTItem) => nft.id === nft_id ? {...nft, status: 'STAKED', stakeExpireDate: now.toISOString()} : {...nft}));

    unpopModal();
    stakableNFTs = []
    await getUserTokens()
    setNFTList(stakableNFTs.filter((nft: IStakableNFTItem) => getType(nft) !== 'stake'))
  }

  const showModal = (nft_id: number) => {
    popModal(<SetStakingTimerModal nftId={nft_id} onSubmit={days => stakeFor(nft_id, days)} />);
  }

  const stake = (nft_id: number) => {
    showModal(nft_id);
  }

  const approve = async () => {
    await getUserTokens()
    setNFTList(stakableNFTs.filter((nft: IStakableNFTItem) => getType(nft) !== 'stake'))
  }

  const unStake = async () => {
    stakableNFTs = []
    await getUserTokens()
    setNFTList(stakableNFTs.filter((nft: IStakableNFTItem) => getType(nft) !== 'unstake'))
    // validate and unstake nft in database
    // setNFTList(stakableNFTs.map((nft: IStakableNFTItem) => nft.id === nft_id ? {...nft, status: 'NOT-STAKED'} : {...nft}));
  }


  const reward = async () => {
    // await getUserTokens()
    // setNFTList(stakableNFTs.filter((nft: IStakableNFTItem) => getType(nft) !== 'stake'))
  }

  return (
    <Guest socials={socials} title="Earn">
      {/* <div style={{fontSize:'50px', margin:"15% 40% 15% 40%", width:"100%", color:"#3dc1df"}}><h1>Coming Soon</h1></div> */}
      <div className={styles.Earn}>
        <TopBar stakes={stakeCount} />

        <div className="row p-sm-5">
          <div className="container-fluid">
            <TabBar onChange={filter} />
          </div>
          {nftlist.length ? nftlist.map(nft => (<StakableNFTItem key={JSON.stringify(nft)} nftStatus={nft.status}  stakeExpireDate={nft.stakeExpireDate} onApprove={() => {approve()}} onUnStake={() => unStake()} onReward={() => reward()}  onStake={() => stake(nft.id)}  {...nft} getType={getType} nftID={nft.id}/> )) : (<h3>No item found!</h3>)}

          {/* <SupplyInfoBox {...supplyInfo} onBuyClick={onBuyClick} /> */}

          <FAQs faqs={faqs} />

        </div>
      </div>
      {Modal ? (
          <ModalContainer onOverlayClick={unpopModal}>{Modal}</ModalContainer>
      ) : ''}
    </Guest>
  )
}

export async function getStaticProps() {

  const status1 = new Date();
  status1.setFullYear(status1.getFullYear() + 1);

  const stakableNFTs: Array<IStakableNFTItem> = [

  ];

  const faqs: Array<IFAQItem> = [
    {
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolor?',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna\n' +
          'aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque.\n' +
          'In egestas erat imperdiet sed euismod nisi porta lorem mollis. Morbi tristique senectus et netus. Mattis pellentesque id\n' +
          'nibh tortor id aliquet lectus proin. Sapien faucibus et molestie ac feugiat sed lectus vestibulum. Ullamcorper velit sed'
    },
    {
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo incididunt ut labore et dolor?',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna\n' +
          'aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque.\n' +
          'In egestas erat imperdiet sed euismod nisi porta lorem mollis. Morbi tristique senectus et netus. Mattis pellentesque id\n' +
          'nibh tortor id aliquet lectus proin. Sapien faucibus et molestie ac feugiat sed lectus vestibulum. Ullamcorper velit sed'
    },
    {
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temor incididunt ut labore et dolor?',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna\n' +
          'aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque.\n' +
          'In egestas erat imperdiet sed euismod nisi porta lorem mollis. Morbi tristique senectus et netus. Mattis pellentesque id\n' +
          'nibh tortor id aliquet lectus proin. Sapien faucibus et molestie ac feugiat sed lectus vestibulum. Ullamcorper velit sed'
    },
    {
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod mpor incididunt ut labore et dolor?',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna\n' +
          'aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque.\n' +
          'In egestas erat imperdiet sed euismod nisi porta lorem mollis. Morbi tristique senectus et netus. Mattis pellentesque id\n' +
          'nibh tortor id aliquet lectus proin. Sapien faucibus et molestie ac feugiat sed lectus vestibulum. Ullamcorper velit sed'
    },
    {
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusm tempor incididunt ut labore et dolor?',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna\n' +
          'aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque.\n' +
          'In egestas erat imperdiet sed euismod nisi porta lorem mollis. Morbi tristique senectus et netus. Mattis pellentesque id\n' +
          'nibh tortor id aliquet lectus proin. Sapien faucibus et molestie ac feugiat sed lectus vestibulum. Ullamcorper velit sed'
    },
    {
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do usmod tempor incididunt ut labore et dolor?',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna\n' +
          'aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque.\n' +
          'In egestas erat imperdiet sed euismod nisi porta lorem mollis. Morbi tristique senectus et netus. Mattis pellentesque id\n' +
          'nibh tortor id aliquet lectus proin. Sapien faucibus et molestie ac feugiat sed lectus vestibulum. Ullamcorper velit sed'
    },
  ];

  return {
    props: {
      title: "Earn",
      stakableNFTs,
      faqs,
      summaryInfo: {
        marketCap: '320,056,123.80',
        earned: '0.4 ETH',
        stakes: 12,
        totalCoins: 100,
        userCoins: 12
      },
      supplyInfo: {
        unw: '2.78',
        max: '456,978,675',
        total: '456,978,675',
        circulating: '456,978,675',
        burned: '456,978,675',
        marketCap: '456,978,675'
      }
    }
  }
}