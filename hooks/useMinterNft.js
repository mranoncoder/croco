import { crocoKingLegendaryAbi } from '../abi/abi'
import { crocoKingLegendaryContractAddress } from '../contractAddress'
import { getContract } from '../utils/contractHelpers'
import { sendTransaction } from '../utils/sendTx'
import useWeb3 from './useWeb3'

const useMinterNft = (address, chainId, count, toAddress) => {

  console.log(address, chainId, count, toAddress)
  const web3 = useWeb3()
  // const contractAddress = '0xc52e8d50df9c814163d4298dBFaF3f9e48f41ff2'
  const status = 'Mint'
  const mint = async () => {
      const contract = getContract(crocoKingLegendaryAbi, crocoKingLegendaryContractAddress, web3)
      console.log(contract)
      if (!contract) {
        console.error('contract is null')
        return
      }
      
      const price =  await contract.methods.price(count).call()

        return sendTransaction(
          status,
          contract,
          'mint',
          [toAddress, count],
          address,
          price
        )
      }

    return mint

}

export default useMinterNft
