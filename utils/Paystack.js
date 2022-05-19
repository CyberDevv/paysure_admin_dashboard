import uid from 'generate-unique-id'

export const config = (
  email,
  amount,
  firstName,
  lastName,
  phone,
  walletID,
) => {
  return {
    reference: new Date().getTime().toString(),
    email: email,
    amount: amount,
    publicKey: process.env.PAYSTACK_PUBLIC_KEY,
    metadata: {
      custom_field: [
        {
          'First Name': firstName,
          'Last Name': lastName,
          'Transaction ID': uid({ length: 20 }),
          'Phone Number': phone,
          'Wallet ID': walletID,
        },
      ],
    },
  }
}

export const onSuccess = reference => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log(reference)
}

export const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log('closed')
}
