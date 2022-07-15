export const getContract = (abi, address, web3) => {
  return new web3.eth.Contract(abi, address)
}

