import { crocoKingLegendaryAbi } from '../abi/abi'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'
import { crocoKingLegendaryContractAddress, crocoKingStakingContractAddress } from '../contractAddress'

const useIsApproved=  (account) => {
    const web3 = useWeb3()
    const isApproved = async (nftID) => {
        if (account != undefined){
            const contract = getContract(crocoKingLegendaryAbi, crocoKingLegendaryContractAddress, web3)

            const res =  await contract.methods.getApproved(nftID).call();
            if (res != crocoKingStakingContractAddress){
                return false
            }
            else{
                return true
            }
        }
    }

    return isApproved
}

export default useIsApproved