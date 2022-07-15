import { crocoKingStakingAbi } from '../abi/abi'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'
import { crocoKingStakingContractAddress } from '../contractAddress'
import crocodileNFT from "../images/crocodile-nft.png";
const useUserStakedNFTs =  (account) => {
    let data = {}
    let stakedList = []
    const web3 = useWeb3()
    const getStakedNFTs = async () => {
        stakedList = []
        if (account != undefined){
            // const contractAddress = '0x7A4aCd401DBea587fb7ecC42D6a74AED86694fE2';
            const contract = getContract(crocoKingStakingAbi, crocoKingStakingContractAddress, web3)
            const res =  await contract.methods.userInfo(account).call();
            console.log(res)
            let minutes;
            if (res.length > 0){
                res.map((NFT) => {
                    console.log(NFT.index)
                    if(NFT.index == '0'){
                        minutes = 3
                    }
                    if(NFT.index == '1'){
                        minutes = 10
                    }
                    if(NFT.index == '2'){
                        minutes = 15
                    }
                    data.id = NFT.tokenId

                    data.image = `https://gateway.pinata.cloud/ipfs/QmbUdts2EnzWtJMfMGBsSD169eThxftJndeWAbVaxErvhK/${String(NFT.tokenId).padStart(4,'0')}.png`
                    var date = new Date(NFT.stakeTime*1000);
                    data.stakeExpireDate =  date.getTime() + (60000 * minutes)
                    data.status =  'STAKED'
                    data.earnPerDay = ''
                    console.log(data)
                    stakedList.push({...data})
                    // 86400000
                })
            }


            return stakedList

        }
    }

    return getStakedNFTs
}

export default useUserStakedNFTs