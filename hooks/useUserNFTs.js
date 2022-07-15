import { crocoKingLegendaryAbi } from '../abi/abi'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'
import { crocoKingLegendaryContractAddress } from '../contractAddress'

const useUserNFTs =  (account) => {
    console.log(account)
    const web3 = useWeb3()
    const getNFTs = async () => {
        if (account != undefined){
            // const contractAddress = '0x7A4aCd401DBea587fb7ecC42D6a74AED86694fE2';
            const contract = getContract(crocoKingLegendaryAbi, crocoKingLegendaryContractAddress, web3)
            const res =  await contract.methods.tokensOfOwner(account).call();
            console.log(res)
            return res
        }
    }
    return getNFTs
}

export default useUserNFTs