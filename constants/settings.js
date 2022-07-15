import { ChainMap } from './chainsMap'

export const validChains = [4]



export const ChainGraphMap = {
  [ChainMap.RINKEBY]: process.env.NEXT_PUBLIC_RINKEBY_GRAPH_URL,
  [ChainMap.ROPSTEN]: process.env.NEXT_PUBLIC_ROPSTEN_GRAPH_URL,
  [ChainMap.BSC_TESTNET]: process.env.NEXT_PUBLIC_BSC_TESTNET_GRAPH_URL,
}
