import { crocoKingStakingAbi } from '../abi/abi'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'
import { crocoKingLegendaryContractAddress, crocoKingStakingContractAddress } from '../contractAddress'

const useEarn = () => {
    const web3 = useWeb3()
    const earn = async (nftID) => {
        const contract = await getContract(crocoKingStakingAbi, crocoKingStakingContractAddress, web3)
        const minTokenReward = await contract.methods.minTokenReward().call();
        const res =  await contract.methods.earned(nftID).call();
        // console.log(nftID, res, minTokenReward)
        if( Number(res) > Number(minTokenReward)){
            return {res:false, value:res}
        }
        else{
            return {res:true, value:res}
        }
    }

    return earn
}

export default useEarn