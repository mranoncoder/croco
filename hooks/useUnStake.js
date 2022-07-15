import { crocoKingStakingAbi } from '../abi/abi'
import { crocoKingStakingContractAddress} from '../contractAddress'
import { getContract } from '../utils/contractHelpers'
import { sendTransaction } from '../utils/sendTx'
import {useAddTransaction} from '../state/transactions/hooks' 
import useWeb3 from './useWeb3'

                
const useUnStake = (account, setTransaction) => {

  const web3 = useWeb3()
  const status = 'UnStake'
  const addTransaction = useAddTransaction()
  const unStake = async ( tokeId) => {
    console.log(tokeId)
      const contract = getContract(crocoKingStakingAbi, crocoKingStakingContractAddress, web3)
      console.log(contract)
      if (!contract) {
        console.error('contract is null')
        return
      }

        return sendTransaction(
            status,
            contract,
            'unstake',
            [tokeId],
            account,
            addTransaction
        )
      }

    return unStake

}

export default useUnStake
