import { crocoKingStakingAbi } from '../abi/abi'
import { crocoKingStakingContractAddress} from '../contractAddress'
import { getContract } from '../utils/contractHelpers'
import { sendTransaction } from '../utils/sendTx'
import useWeb3 from './useWeb3'
import {useAddTransaction} from '../state/transactions/hooks' 

const useStake = () => {
  
  const addTransaction = useAddTransaction()
  const web3 = useWeb3()
  const status = 'Stake'
  const stake = async (account, tokeId, packageIndex) => {
    console.log(packageIndex)
      const contract = getContract(crocoKingStakingAbi, crocoKingStakingContractAddress, web3)
      console.log(contract)
      if (!contract) {
        console.error('contract is null')
        return
      }

        return sendTransaction(
            status,
            contract,
            'stake',
            [tokeId, packageIndex],
            account,
            addTransaction
        )
      }

    return stake

}

export default useStake
