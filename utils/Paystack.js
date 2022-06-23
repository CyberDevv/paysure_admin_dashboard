import axios from "axios"

export const onSuccess = reference => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log(reference)

  // axios.post('/paysure/api/processor/verify-paystack-trans/{transactionID}')
}

export const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log('closed')
}
