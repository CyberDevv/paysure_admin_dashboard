import React from 'react'
import tw from 'twin.macro'
import Image from 'next/image'
import CurrencyFormat from 'react-currency-format'
import { Button, Dialog, Divider } from '@mui/material'

import Logo from '../public/svg/paysureLogo.svg'

const ReceiptModal = React.forwardRef(function receipt(
  { title, buttonLabel, state, setState, children, onClick, isTransaction },
  ref,
) {
  return (
    <Wrapper ref={ref}>
      <div tw="flex items-center justify-center mt-8">
        <Logo />
      </div>

      {/* Address info */}
      <div tw="text-center mt-10">
        <h6 className="font-500">Bizzdesk Global Solution</h6>
        <p tw="text-[#425D8A] mt-2">
          No 17, Bukoye street, 2nd avenue, Gwagwalda, Abuja
        </p>
      </div>

      {/* hyper details */}
      {!isTransaction && (
        <div tw="text-dark mt-7">
          <p tw="flex justify-between items-center">
            <span className="font-500">2033ABU00002988</span>
            <span className="font-500">2033AXGA</span>
          </p>
          <p tw="flex justify-between items-center space-y-1.5">
            <span className="font-500">10 October, 2021</span>
            <span className="font-500">12:42:18</span>
          </p>
        </div>
      )}

      {!isTransaction && (
        <p tw="text-center my-5" className="font-500">
          Purchase
        </p>
      )}

      {!isTransaction && <Divider />}

      {isTransaction && <Divider tw="mt-8 mb-5" />}

      {!isTransaction && (
        <p tw="text-center mt-5" className="font-500">
          Approved
        </p>
      )}

      {!isTransaction && (
        <p tw="text-center text-[#425D8A] my-3" className="font-500">
          -- Customer&apos;s copy --
        </p>
      )}

      {/* Transaction Details */}
      {!isTransaction && (
        <div tw="space-y-3">
          <TransactionDetail label="Scheme" value="Debit MasterCard" />
          <TransactionDetail label="Pan" value="572762***6766Scheme77" />
          <TransactionDetail label="Expiry Date" value="05/12" />
          <TransactionDetail label="Name" value="Customer/Zenith" />
          <TransactionDetail label="Stan" value="124204" />
          <TransactionDetail label="RRN" value="2323232323234" />
          <TransactionDetail label="Auth ID" value="BDDDB2" />
          <TransactionDetail label="Account" value="Savings" />
          <TransactionDetail label="Response Code" value="00" />

          <p tw="text-[#16192C]">Approved</p>
        </div>
      )}

      {isTransaction && (
        <div tw="space-y-5">
          <TransactionDetail
            label="Transaction ID"
            value="u4gu9puboauoiaoYBO"
          />
          <TransactionDetail
            label="Date/Time"
            value="10 October, 2021 - 10:34:56"
          />
          <TransactionDetail label="Customer Name" value="u4gu9puboauoiaoYBO" />
          <TransactionDetail
            label="Payment date"
            value="10 October, 2021 - 10:34:56"
          />
          <TransactionDetail label="Merchant ID" value="124204" />
          <TransactionDetail label="Plan" value="2323232323234" />
          <TransactionDetail label="Status Code" value="BDDDB2" />
        </div>
      )}

      {!isTransaction && (
        <div>
          <Divider tw="my-5" />

          <CurrencyFormat
            value={0.01}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'NGN '}
            className="font-500"
            tw="text-[40px] text-dark text-center block"
          />

          <Divider tw="my-5" />

          <div tw="space-y-3">
            <TransactionDetail label="Verification Method" value="Online PIN" />
            <TransactionDetail label="TVR" value="4304983489384" />
            <TransactionDetail label="TSI" value="E800" />
            <TransactionDetail label="Name" value="Customer/Zenith" />
            <TransactionDetail label="Receipt NUmber" value="3" />
          </div>
        </div>
      )}
      <Divider tw="my-5" />

      <div tw="text-center space-y-1.5">
        <p className="font-500">goPOS: 1.0.0</p>
        <p className="font-500">PTS;P: BizzdeskGroup</p>
        <p className="font-500">suppport@bizzdeskgroup.com</p>
        <p className="font-500">09087777715</p>
      </div>
    </Wrapper>
  )
})

const TransactionDetail = ({ label, value }) => {
  return (
    <p
      tw="flex items-center justify-between text-[#505780]"
      className="font-500"
    >
      <span>{label}:</span>
      <span tw="text-dark" className="font-500">
        {value}
      </span>
    </p>
  )
}

// Tailwind styles
const Wrapper = tw.div`w-[400px] min-w-[400px] bg-white px-8 py-12 border`
const InnerDialog = tw.div`py-5 overflow-hidden w-[400px]`
const DialogTitle = tw.h5`px-8 text-base text-paysure-text-100 text-center`
const Form = tw.form`px-8 py-4`
const ModalButton = tw(
  Button,
)`normal-case bg-paysure-100 text-white w-full py-5 rounded-xl text-sm hover:(bg-paysure-100 shadow-xl)`
const IconWrapper = tw.button`absolute right-5 top-3.5 text-[#425D8A] hover:(text-red-700) transition-colors cursor-pointer stroke-current`

export default ReceiptModal
