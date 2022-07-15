// import { TransactionStatus } from '../constants/transactionStatus'
import Swal from 'sweetalert2'


export const sendTransaction = (status, contract, methodName, params, account, addTransaction, 
  payableValue = null) => {
  return new Promise((resolve, reject) => {
    try {
      let hash = null
      let options = { from: account }
      if(payableValue !== null)
      {
        options['value'] = payableValue
      }
      contract.methods[methodName](...params)
        .send(options)
        .once('transactionHash', (tx) => {
          hash = tx

        })
        .once('receipt', (res) => {
          console.log(res.transactionHash)
          addTransaction({address:res.transactionHash})
          Swal.fire({
            icon: 'success',
            text:`Successfully ${status}`,
            showConfirmButton: false,
            timer:1500
          })
        })
        .once('error', (error) => {
          console.log(error)
          Swal.fire({
            icon: 'error',
            text:`${error.message}`,
            showConfirmButton: false,
            timer:2500
          })
          if (!hash) {

            reject()
            return
          }

          console.log('error in sendTX', error)
          reject()
        })
        .then(receipt => {
          resolve(receipt)
        })
    } catch (error) {
      console.log('error happend in send Transaction', error)
    }
  })
}
