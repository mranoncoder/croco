import { crocoKingLegendaryAbi } from '../abi/abi'
import { crocoKingLegendaryContractAddress } from '../contractAddress'
import { getContract } from '../utils/contractHelpers'
import crocodileNFT from "../images/crocodile-nft.png";
import useWeb3 from './useWeb3'

const useTokenOfUser = (address) => {
  let data = {}
  let NFTlist = []
  const web3 = useWeb3()
  const contract = getContract(crocoKingLegendaryAbi, crocoKingLegendaryContractAddress, web3)
  
  const getToken = async () => {
    NFTlist = []
      if (!contract) {
        console.error('contract is null')
        return
      }
      let res =  await contract.methods.tokensOfOwner(address).call()
      console.log()
      res.map(async (NFT) => {
        data.id = NFT
        data.image = `https://gateway.pinata.cloud/ipfs/QmbUdts2EnzWtJMfMGBsSD169eThxftJndeWAbVaxErvhK/${String(NFT).padStart(4,'0')}.png`
        data.status = 'NOT-STAKED'
        data.earnPerDay = ''
        NFTlist.push({...data})
      })
      return NFTlist
      }

    return getToken

}

export default useTokenOfUser
