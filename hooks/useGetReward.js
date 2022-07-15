import { crocoKingStakingAbi } from '../abi/abi'
import { crocoKingStakingContractAddress} from '../contractAddress'
import { getContract } from '../utils/contractHelpers'
import { sendTransaction } from '../utils/sendTx'
import useWeb3 from './useWeb3'
import {useAddTransaction} from '../state/transactions/hooks' 

const useGetReward = (account) => {
  const addTransaction = useAddTransaction()
  const web3 = useWeb3()
  const status = 'Get reward'
  const getReward = async (tokeId) => {
      const contract = getContract(crocoKingStakingAbi, crocoKingStakingContractAddress, web3)
      console.log(contract)
      if (!contract) {
        console.error('contract is null')
        return
      }

        return sendTransaction(
            status,
            contract,
            'getReward',
            [tokeId],
            account,
            addTransaction
        )
      }

    return getReward

}

export default useGetReward
