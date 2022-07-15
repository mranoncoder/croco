import { crocoKingLegendaryAbi } from '../abi/abi'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'
import { sendTransaction } from '../utils/sendTx'
import { crocoKingLegendaryContractAddress, crocoKingStakingContractAddress } from '../contractAddress'
import {useAddTransaction} from '../state/transactions/hooks' 
const useApprove =  (account) => {
    const addTransaction = useAddTransaction()
    const web3 = useWeb3()
    const status = 'Approve'
    const approve= async (nftID) => {
        if (account != undefined){
            const contract = getContract(crocoKingLegendaryAbi, crocoKingLegendaryContractAddress, web3)

            return sendTransaction(
                status,
                contract,
                'approve',
                [crocoKingStakingContractAddress, nftID],
                account,
                addTransaction
              )
        }
    }

    return approve
}

export default useApprove