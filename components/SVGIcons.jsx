import React from 'react'
import { SvgIcon } from '@mui/material'

export const ProfilePicPlaceholder = () => {
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{
        width: '32px',
        height: '32px',
        fill: 'none',
      }}
    >
      <circle cx="16" cy="16" r="15.5" stroke="url(#paint0_linear_5702_8521)" />
      <path
        d="M16 7.66666C13.8167 7.66666 12.0417 9.44166 12.0417 11.625C12.0417 13.7667 13.7167 15.5 15.9 15.575C15.9667 15.5667 16.0334 15.5667 16.0834 15.575C16.1 15.575 16.1084 15.575 16.125 15.575C16.1334 15.575 16.1334 15.575 16.1417 15.575C18.275 15.5 19.95 13.7667 19.9584 11.625C19.9584 9.44166 18.1834 7.66666 16 7.66666Z"
        fill="white"
      />
      <path
        d="M20.2334 17.7917C17.9084 16.2417 14.1167 16.2417 11.775 17.7917C10.7167 18.5 10.1334 19.4583 10.1334 20.4833C10.1334 21.5083 10.7167 22.4583 11.7667 23.1583C12.9334 23.9417 14.4667 24.3333 16 24.3333C17.5334 24.3333 19.0667 23.9417 20.2334 23.1583C21.2834 22.45 21.8667 21.5 21.8667 20.4667C21.8584 19.4417 21.2834 18.4917 20.2334 17.7917Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_5702_8521"
          x1="32"
          y1="0"
          x2="0"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F1F1F5" />
          <stop offset="1" stopColor="#E4ECF7" />
        </linearGradient>
      </defs>
    </SvgIcon>
  )
}

export const LeftArrow = () => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      sx={{
        width: '24px',
        height: '24px',
        fill: 'none',
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.5 12C22.5 11.5858 22.1642 11.25 21.75 11.25H4.06066L8.78033 6.53033C9.07322 6.23744 9.07322 5.76256 8.78033 5.46967C8.48744 5.17678 8.01256 5.17678 7.71967 5.46967L1.71967 11.4697C1.42678 11.7626 1.42678 12.2374 1.71967 12.5303L7.71967 18.5303C8.01256 18.8232 8.48744 18.8232 8.78033 18.5303C9.07322 18.2374 9.07322 17.7626 8.78033 17.4697L4.06066 12.75H21.75C22.1642 12.75 22.5 12.4142 22.5 12Z"
        fill="white"
      />
    </SvgIcon>
  )
}

export const Categories = () => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      sx={{
        width: '24px',
        height: '24px',
      }}
    >
      <path d="M18.6699 2H16.7699C14.5899 2 13.4399 3.15 13.4399 5.33V7.23C13.4399 9.41 14.5899 10.56 16.7699 10.56H18.6699C20.8499 10.56 21.9999 9.41 21.9999 7.23V5.33C21.9999 3.15 20.8499 2 18.6699 2Z" />
      <path d="M7.24 13.43H5.34C3.15 13.43 2 14.58 2 16.76V18.66C2 20.85 3.15 22 5.33 22H7.23C9.41 22 10.56 20.85 10.56 18.67V16.77C10.57 14.58 9.42 13.43 7.24 13.43Z" />
      <path d="M6.29 10.58C8.6593 10.58 10.58 8.6593 10.58 6.29C10.58 3.9207 8.6593 2 6.29 2C3.9207 2 2 3.9207 2 6.29C2 8.6593 3.9207 10.58 6.29 10.58Z" />
      <path d="M17.7099 22C20.0792 22 21.9999 20.0793 21.9999 17.71C21.9999 15.3407 20.0792 13.42 17.7099 13.42C15.3406 13.42 13.4199 15.3407 13.4199 17.71C13.4199 20.0793 15.3406 22 17.7099 22Z" />
    </SvgIcon>
  )
}

export const Transactions = () => {
  return (
    <SvgIcon
      viewBox="0 0 16 16"
      sx={{
        width: '16px',
        height: '16px',
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 1.5C1 1.77614 1.22386 2 1.5 2H14.5C14.7761 2 15 1.77614 15 1.5C15 1.22386 14.7761 1 14.5 1H1.5C1.22386 1 1 1.22386 1 1.5Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 14.5C1 14.7761 1.22386 15 1.5 15H14.5C14.7761 15 15 14.7761 15 14.5C15 14.2239 14.7761 14 14.5 14H1.5C1.22386 14 1 14.2239 1 14.5Z"
      />
      <path d="M2 7C2 6.44772 2.44772 6 3 6H13C13.5523 6 14 6.44772 14 7V9C14 9.55228 13.5523 10 13 10H3C2.44772 10 2 9.55228 2 9V7Z" />
    </SvgIcon>
  )
}

export const Organizations = () => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      sx={{
        width: '24px',
        height: '24px',
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5 21C10.5 21 9 21 9 19.5C9 18 10.5 13.5 16.5 13.5C22.5 13.5 24 18 24 19.5C24 21 22.5 21 22.5 21H10.5Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.5 12C18.9853 12 21 9.98528 21 7.5C21 5.01472 18.9853 3 16.5 3C14.0147 3 12 5.01472 12 7.5C12 9.98528 14.0147 12 16.5 12Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.82454 21C7.61334 20.5739 7.5 20.0687 7.5 19.5C7.5 17.4668 8.51858 15.3758 10.4039 13.9199C9.57914 13.6561 8.61764 13.5 7.5 13.5C1.5 13.5 0 18 0 19.5C0 21 1.5 21 1.5 21H7.82454Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.75 12C8.82107 12 10.5 10.3211 10.5 8.25C10.5 6.17893 8.82107 4.5 6.75 4.5C4.67893 4.5 3 6.17893 3 8.25C3 10.3211 4.67893 12 6.75 12Z"
      />
    </SvgIcon>
  )
}

export const Support = () => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      sx={{
        width: '24px',
        height: '24px',
      }}
    >
      <path d="M18 2H6C4.34 2 3 3.33 3 4.97V15.88C3 17.52 4.34 18.85 6 18.85H6.76C7.56 18.85 8.32 19.16 8.88 19.72L10.59 21.41C11.37 22.18 12.64 22.18 13.42 21.41L15.13 19.72C15.69 19.16 16.46 18.85 17.25 18.85H18C19.66 18.85 21 17.52 21 15.88V4.97C21 3.33 19.66 2 18 2ZM10.38 13.01C10.79 13.01 11.13 13.35 11.13 13.76C11.13 14.17 10.79 14.51 10.38 14.51H7.7C7.26 14.51 6.85 14.3 6.59 13.94C6.34 13.6 6.28 13.18 6.4 12.78C6.75 11.71 7.61 11.13 8.37 10.61C9.17 10.07 9.62 9.73 9.62 9.15C9.62 8.63 9.2 8.21 8.68 8.21C8.16 8.21 7.75 8.64 7.75 9.16C7.75 9.57 7.41 9.91 7 9.91C6.59 9.91 6.25 9.57 6.25 9.16C6.25 7.82 7.34 6.72 8.69 6.72C10.04 6.72 11.13 7.81 11.13 9.16C11.13 10.57 10.07 11.29 9.22 11.87C8.69 12.23 8.19 12.57 7.94 13.02H10.38V13.01ZM17 13.08H16.79V13.77C16.79 14.18 16.45 14.52 16.04 14.52C15.63 14.52 15.29 14.18 15.29 13.77V13.08H13.33C13.33 13.08 13.33 13.08 13.32 13.08C12.83 13.08 12.38 12.82 12.13 12.4C11.88 11.97 11.88 11.44 12.13 11.02C12.81 9.85 13.6 8.52 14.32 7.36C14.64 6.85 15.25 6.62 15.82 6.78C16.39 6.95 16.79 7.47 16.78 8.07V11.59H17C17.41 11.59 17.75 11.93 17.75 12.34C17.75 12.75 17.41 13.08 17 13.08Z" />
      <path d="M15.29 11.58V8.64001C14.7 9.60001 14.09 10.63 13.54 11.57H15.29V11.58Z" />
    </SvgIcon>
  )
}

export const Terminals = () => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      sx={{
        width: '24px',
        height: '24px',
      }}
    >
      <path d="M22 21.25C22 21.66 21.66 22 21.25 22H2.75C2.34 22 2 21.66 2 21.25C2 20.84 2.34 20.5 2.75 20.5H21.25C21.66 20.5 22 20.84 22 21.25Z" />
      <path d="M15.3899 4.52001L4.64994 15.26C4.23994 15.67 3.57994 15.67 3.17994 15.26H3.16994C1.77994 13.86 1.77994 11.6 3.16994 10.21L10.3199 3.06001C11.7199 1.66001 13.9799 1.66001 15.3799 3.06001C15.7899 3.45001 15.7899 4.12001 15.3899 4.52001Z" />
      <path d="M20.8199 8.48995L17.7699 5.43995C17.3599 5.02995 16.6999 5.02995 16.2999 5.43995L5.55994 16.1799C5.14994 16.5799 5.14994 17.2399 5.55994 17.6499L8.60994 20.7099C10.0099 22.0999 12.2699 22.0999 13.6699 20.7099L20.8099 13.5599C22.2299 12.1599 22.2299 9.88995 20.8199 8.48995ZM12.7599 17.5199L11.5499 18.7399C11.2999 18.9899 10.8899 18.9899 10.6299 18.7399C10.3799 18.4899 10.3799 18.0799 10.6299 17.8199L11.8499 16.5999C12.0899 16.3599 12.5099 16.3599 12.7599 16.5999C13.0099 16.8499 13.0099 17.2799 12.7599 17.5199ZM16.7299 13.5499L14.2899 15.9999C14.0399 16.2399 13.6299 16.2399 13.3699 15.9999C13.1199 15.7499 13.1199 15.3399 13.3699 15.0799L15.8199 12.6299C16.0599 12.3899 16.4799 12.3899 16.7299 12.6299C16.9799 12.8899 16.9799 13.2999 16.7299 13.5499Z" />
    </SvgIcon>
  )
}

export const Providers = () => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      sx={{
        width: '24px',
        height: '24px',
      }}
    >
      <path d="M21.9201 16.75C21.5901 19.41 19.4101 21.59 16.7501 21.92C15.1401 22.12 13.6401 21.68 12.4701 20.82C11.8001 20.33 11.9601 19.29 12.7601 19.05C15.7701 18.14 18.1401 15.76 19.0601 12.75C19.3001 11.96 20.3401 11.8 20.8301 12.46C21.6801 13.64 22.1201 15.14 21.9201 16.75Z" />
      <path d="M9.99 2C5.58 2 2 5.58 2 9.99C2 14.4 5.58 17.98 9.99 17.98C14.4 17.98 17.98 14.4 17.98 9.99C17.97 5.58 14.4 2 9.99 2ZM9.05 8.87L11.46 9.71C12.33 10.02 12.75 10.63 12.75 11.57C12.75 12.65 11.89 13.54 10.84 13.54H10.75V13.59C10.75 14 10.41 14.34 10 14.34C9.59 14.34 9.25 14 9.25 13.59V13.53C8.14 13.48 7.25 12.55 7.25 11.39C7.25 10.98 7.59 10.64 8 10.64C8.41 10.64 8.75 10.98 8.75 11.39C8.75 11.75 9.01 12.04 9.33 12.04H10.83C11.06 12.04 11.24 11.83 11.24 11.57C11.24 11.22 11.18 11.2 10.95 11.12L8.54 10.28C7.68 9.98 7.25 9.37 7.25 8.42C7.25 7.34 8.11 6.45 9.16 6.45H9.25V6.41C9.25 6 9.59 5.66 10 5.66C10.41 5.66 10.75 6 10.75 6.41V6.47C11.86 6.52 12.75 7.45 12.75 8.61C12.75 9.02 12.41 9.36 12 9.36C11.59 9.36 11.25 9.02 11.25 8.61C11.25 8.25 10.99 7.96 10.67 7.96H9.17C8.94 7.96 8.76 8.17 8.76 8.43C8.75 8.77 8.81 8.79 9.05 8.87Z" />
    </SvgIcon>
  )
}

export const Users = () => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      sx={{
        width: '24px',
        height: '24px',
      }}
    >
      <path d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z" />
      <path d="M17.08 14.15C14.29 12.29 9.73996 12.29 6.92996 14.15C5.65996 15 4.95996 16.15 4.95996 17.38C4.95996 18.61 5.65996 19.75 6.91996 20.59C8.31996 21.53 10.16 22 12 22C13.84 22 15.68 21.53 17.08 20.59C18.34 19.74 19.04 18.6 19.04 17.36C19.03 16.13 18.34 14.99 17.08 14.15Z" />
    </SvgIcon>
  )
}

export const SubAccounts = () => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      sx={{
        width: '24px',
        height: '24px',
      }}
    >
      <path d="M9 2C6.38 2 4.25 4.13 4.25 6.75C4.25 9.32 6.26 11.4 8.88 11.49C8.96 11.48 9.04 11.48 9.1 11.49C9.12 11.49 9.13 11.49 9.15 11.49C9.16 11.49 9.16 11.49 9.17 11.49C11.73 11.4 13.74 9.32 13.75 6.75C13.75 4.13 11.62 2 9 2Z" />
      <path d="M14.08 14.15C11.29 12.29 6.73996 12.29 3.92996 14.15C2.65996 15 1.95996 16.15 1.95996 17.38C1.95996 18.61 2.65996 19.75 3.91996 20.59C5.31996 21.53 7.15996 22 8.99996 22C10.84 22 12.68 21.53 14.08 20.59C15.34 19.74 16.04 18.6 16.04 17.36C16.03 16.13 15.34 14.99 14.08 14.15Z" />
      <path d="M19.9901 7.33998C20.1501 9.27998 18.7701 10.98 16.8601 11.21C16.8501 11.21 16.8501 11.21 16.8401 11.21H16.8101C16.7501 11.21 16.6901 11.21 16.6401 11.23C15.6701 11.28 14.7801 10.97 14.1101 10.4C15.1401 9.47998 15.7301 8.09998 15.6101 6.59998C15.5401 5.78998 15.2601 5.04998 14.8401 4.41998C15.2201 4.22998 15.6601 4.10998 16.1101 4.06998C18.0701 3.89998 19.8201 5.35998 19.9901 7.33998Z" />
      <path d="M21.99 16.59C21.91 17.56 21.29 18.4 20.25 18.97C19.25 19.52 17.99 19.78 16.74 19.75C17.46 19.1 17.88 18.29 17.96 17.43C18.06 16.19 17.47 15 16.29 14.05C15.62 13.52 14.84 13.1 13.99 12.79C16.2 12.15 18.98 12.58 20.69 13.96C21.61 14.7 22.08 15.63 21.99 16.59Z" />
    </SvgIcon>
  )
}

export const Roles = () => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      sx={{
        width: '24px',
        height: '24px',
      }}
    >
      <path d="M18.4999 4.10995L13.5099 2.23995C12.6799 1.92995 11.3199 1.92995 10.4899 2.23995L5.49991 4.10995C4.34991 4.53995 3.40991 5.89995 3.40991 7.11995V14.5499C3.40991 15.7299 4.18991 17.2799 5.13991 17.9899L9.43991 21.1999C10.8499 22.2599 13.1699 22.2599 14.5799 21.1999L18.8799 17.9899C19.8299 17.2799 20.6099 15.7299 20.6099 14.5499V7.11995C20.5899 5.89995 19.6499 4.53995 18.4999 4.10995ZM11.9299 7.02995C13.1099 7.02995 14.0699 7.98995 14.0699 9.16995C14.0699 10.3299 13.1599 11.2599 12.0099 11.2999H11.9899H11.9699C11.9499 11.2999 11.9299 11.2999 11.9099 11.2999C10.7099 11.2599 9.80991 10.3299 9.80991 9.16995C9.79991 7.98995 10.7599 7.02995 11.9299 7.02995ZM14.1899 16.3599C13.5799 16.7599 12.7899 16.9699 11.9999 16.9699C11.2099 16.9699 10.4099 16.7699 9.80991 16.3599C9.23991 15.9799 8.92991 15.4599 8.91991 14.8899C8.91991 14.3299 9.23991 13.7899 9.80991 13.4099C11.0199 12.6099 12.9899 12.6099 14.1999 13.4099C14.7699 13.7899 15.0899 14.3099 15.0899 14.8799C15.0799 15.4399 14.7599 15.9799 14.1899 16.3599Z" />
    </SvgIcon>
  )
}

export const Settings = () => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      sx={{
        width: '24px',
        height: '24px',
      }}
    >
      <path d="M18.9401 5.41994L13.7701 2.42994C12.7801 1.85994 11.2301 1.85994 10.2401 2.42994L5.02008 5.43994C2.95008 6.83994 2.83008 7.04994 2.83008 9.27994V14.7099C2.83008 16.9399 2.95008 17.1599 5.06008 18.5799L10.2301 21.5699C10.7301 21.8599 11.3701 21.9999 12.0001 21.9999C12.6301 21.9999 13.2701 21.8599 13.7601 21.5699L18.9801 18.5599C21.0501 17.1599 21.1701 16.9499 21.1701 14.7199V9.27994C21.1701 7.04994 21.0501 6.83994 18.9401 5.41994ZM12.0001 15.2499C10.2101 15.2499 8.75008 13.7899 8.75008 11.9999C8.75008 10.2099 10.2101 8.74994 12.0001 8.74994C13.7901 8.74994 15.2501 10.2099 15.2501 11.9999C15.2501 13.7899 13.7901 15.2499 12.0001 15.2499Z" />
    </SvgIcon>
  )
}

export const Sighups = () => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      sx={{
        width: '24px',
        height: '24px',
      }}
    >
      <path d="M19.5099 5.85L13.5699 2.42C12.5999 1.86 11.3999 1.86 10.4199 2.42L4.48992 5.85C3.51992 6.41 2.91992 7.45 2.91992 8.58V15.42C2.91992 16.54 3.51992 17.58 4.48992 18.15L10.4299 21.58C11.3999 22.14 12.5999 22.14 13.5799 21.58L19.5199 18.15C20.4899 17.59 21.0899 16.55 21.0899 15.42V8.58C21.0799 7.45 20.4799 6.42 19.5099 5.85ZM11.9999 7.34C13.2899 7.34 14.3299 8.38 14.3299 9.67C14.3299 10.96 13.2899 12 11.9999 12C10.7099 12 9.66992 10.96 9.66992 9.67C9.66992 8.39 10.7099 7.34 11.9999 7.34ZM14.6799 16.66H9.31992C8.50992 16.66 8.03992 15.76 8.48992 15.09C9.16992 14.08 10.4899 13.4 11.9999 13.4C13.5099 13.4 14.8299 14.08 15.5099 15.09C15.9599 15.75 15.4799 16.66 14.6799 16.66Z" />
    </SvgIcon>
  )
}

export const Settlement = () => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      sx={{
        width: '24px',
        height: '24px',
      }}
    >
      <path d="M11.94 2.20995L9.52995 7.81995H7.11995C6.71995 7.81995 6.32995 7.84995 5.94995 7.92995L6.94995 5.52995L6.98995 5.43995L7.04995 5.27995C7.07995 5.20995 7.09995 5.14995 7.12995 5.09995C8.28995 2.40995 9.58995 1.56995 11.94 2.20995Z" />
      <path d="M18.7301 8.09002L18.7101 8.08002C18.1101 7.91002 17.5001 7.82002 16.8801 7.82002H10.6201L12.8701 2.59002L12.9001 2.52002C13.0401 2.57002 13.1901 2.64002 13.3401 2.69002L15.5501 3.62002C16.7801 4.13002 17.6401 4.66002 18.1701 5.30002C18.2601 5.42002 18.3401 5.53002 18.4201 5.66002C18.5101 5.80002 18.5801 5.94002 18.6201 6.09002C18.6601 6.18002 18.6901 6.26002 18.7101 6.35002C18.8601 6.86002 18.8701 7.44002 18.7301 8.09002Z" />
      <path d="M18.29 9.51995C17.84 9.38995 17.37 9.31995 16.88 9.31995H7.11999C6.43999 9.31995 5.79999 9.44995 5.19999 9.70995C3.45999 10.4599 2.23999 12.1899 2.23999 14.1999V16.1499C2.23999 16.3899 2.25999 16.6199 2.28999 16.8599C2.50999 20.0399 4.20999 21.7399 7.38999 21.9499C7.61999 21.9799 7.84999 21.9999 8.09999 21.9999H15.9C19.6 21.9999 21.55 20.2399 21.74 16.7399C21.75 16.5499 21.76 16.3499 21.76 16.1499V14.1999C21.76 11.9899 20.29 10.1299 18.29 9.51995ZM14.5 16.7499H9.49999C9.08999 16.7499 8.74999 16.4099 8.74999 15.9999C8.74999 15.5899 9.08999 15.2499 9.49999 15.2499H14.5C14.91 15.2499 15.25 15.5899 15.25 15.9999C15.25 16.4099 14.91 16.7499 14.5 16.7499Z" />
    </SvgIcon>
  )
}

export const SettingsOUtline = () => {
  return (
    <SvgIcon
      viewBox="0 0 20 20"
      sx={{
        width: '20px',
        height: '20px',
      }}
    >
      <path d="M16.75 7.68336C15.2417 7.68336 14.625 6.6167 15.375 5.30836C15.8083 4.55003 15.55 3.58336 14.7917 3.15003L13.35 2.32503C12.6917 1.93336 11.8417 2.1667 11.45 2.82503L11.3583 2.98336C10.6083 4.2917 9.37499 4.2917 8.61666 2.98336L8.52499 2.82503C8.14999 2.1667 7.29999 1.93336 6.64166 2.32503L5.19999 3.15003C4.44166 3.58336 4.18332 4.55836 4.61666 5.3167C5.37499 6.6167 4.75832 7.68336 3.24999 7.68336C2.38332 7.68336 1.66666 8.3917 1.66666 9.2667V10.7334C1.66666 11.6 2.37499 12.3167 3.24999 12.3167C4.75832 12.3167 5.37499 13.3834 4.61666 14.6917C4.18332 15.45 4.44166 16.4167 5.19999 16.85L6.64166 17.675C7.29999 18.0667 8.14999 17.8334 8.54166 17.175L8.63332 17.0167C9.38332 15.7084 10.6167 15.7084 11.375 17.0167L11.4667 17.175C11.8583 17.8334 12.7083 18.0667 13.3667 17.675L14.8083 16.85C15.5667 16.4167 15.825 15.4417 15.3917 14.6917C14.6333 13.3834 15.25 12.3167 16.7583 12.3167C17.625 12.3167 18.3417 11.6084 18.3417 10.7334V9.2667C18.3333 8.40003 17.625 7.68336 16.75 7.68336ZM9.99999 12.7084C8.50832 12.7084 7.29166 11.4917 7.29166 10C7.29166 8.50836 8.50832 7.2917 9.99999 7.2917C11.4917 7.2917 12.7083 8.50836 12.7083 10C12.7083 11.4917 11.4917 12.7084 9.99999 12.7084Z" />
    </SvgIcon>
  )
}

export const CircledUser = () => {
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{
        width: '32px',
        height: '32px',
      }}
    >
      <circle
        cx="16"
        cy="16"
        r="15.5"
        stroke="url(#paint0_linear_5730_9837)"
        fill="none"
      />
      <path d="M16 7.66669C13.8167 7.66669 12.0417 9.44169 12.0417 11.625C12.0417 13.7667 13.7167 15.5 15.9 15.575C15.9667 15.5667 16.0334 15.5667 16.0834 15.575C16.1 15.575 16.1084 15.575 16.125 15.575C16.1334 15.575 16.1334 15.575 16.1417 15.575C18.275 15.5 19.95 13.7667 19.9584 11.625C19.9584 9.44169 18.1834 7.66669 16 7.66669Z" />
      <path d="M20.2334 17.7917C17.9084 16.2417 14.1167 16.2417 11.775 17.7917C10.7167 18.5 10.1334 19.4583 10.1334 20.4833C10.1334 21.5083 10.7167 22.4583 11.7667 23.1583C12.9334 23.9417 14.4667 24.3333 16 24.3333C17.5334 24.3333 19.0667 23.9417 20.2334 23.1583C21.2834 22.45 21.8667 21.5 21.8667 20.4667C21.8584 19.4417 21.2834 18.4917 20.2334 17.7917Z" />
      <defs>
        <linearGradient
          id="paint0_linear_5730_9837"
          x1="32"
          y1="0"
          x2="0"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F1F1F5" />
          <stop offset="1" stopColor="#E4ECF7" />
        </linearGradient>
      </defs>
    </SvgIcon>
  )
}

export const Search = () => {
  return (
    <SvgIcon
      viewBox="0 0 16 16"
      sx={{
        width: '16px',
        height: '16px',
        fill: 'none',
      }}
    >
      <path
        d="M7.66668 14C11.1645 14 14 11.1645 14 7.66671C14 4.1689 11.1645 1.33337 7.66668 1.33337C4.16887 1.33337 1.33334 4.1689 1.33334 7.66671C1.33334 11.1645 4.16887 14 7.66668 14Z"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6667 14.6667L13.3333 13.3334"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  )
}

export const Calendar = () => {
  return (
    <SvgIcon
      viewBox="0 0 16 16"
      sx={{
        width: '16px',
        height: '16px',
        fill: 'none',
      }}
    >
      <path
        d="M5.33333 1.33337V3.33337"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.6667 1.33337V3.33337"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.33334 6.05994H13.6667"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 8.67338V5.66671C2 3.66671 3 2.33337 5.33333 2.33337H10.6667C13 2.33337 14 3.66671 14 5.66671V11.3334C14 13.3334 13 14.6667 10.6667 14.6667H5.33333C3 14.6667 2 13.3334 2 11.3334"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.4631 9.13338H10.4691"
        stroke="#292D32"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.4631 11.1334H10.4691"
        stroke="#292D32"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99698 9.13338H8.00297"
        stroke="#292D32"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99698 11.1334H8.00297"
        stroke="#292D32"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.52955 9.13338H5.53553"
        stroke="#292D32"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.52955 11.1334H5.53553"
        stroke="#292D32"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  )
}

export const MenuHamburger = () => {
  return (
    <SvgIcon
      viewBox="0 0 384 384"
      sx={{
        width: '20px',
        height: '20px',
        fill: 'none',
      }}
    >
      <g>
        <path
          d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
          fill="#000000"
          data-original="#000000"
          className=""
        />
        <path
          d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
          fill="#000000"
          data-original="#000000"
          className=""
        />
        <path
          d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
          fill="#000000"
          data-original="#000000"
          className=""
        />
      </g>
    </SvgIcon>
  )
}

export const Add = () => {
  return (
    <SvgIcon
      viewBox="0 0 18 18"
      sx={{
        width: '18px',
        height: '18px',
        fill: 'none',
      }}
    >
      <path
        d="M6 9H12"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12V6"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.75 16.5H11.25C15 16.5 16.5 15 16.5 11.25V6.75C16.5 3 15 1.5 11.25 1.5H6.75C3 1.5 1.5 3 1.5 6.75V11.25C1.5 15 3 16.5 6.75 16.5Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  )
}

export const AddSquare = () => {
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{
        width: '32px',
        height: '32px',
        fill: 'none',
      }}
    >
      <path
        d="M21.5867 2.66602H10.4133C5.55999 2.66602 2.66666 5.55935 2.66666 10.4127V21.5727C2.66666 26.4394 5.55999 29.3327 10.4133 29.3327H21.5733C26.4267 29.3327 29.32 26.4394 29.32 21.586V10.4127C29.3333 5.55935 26.44 2.66602 21.5867 2.66602ZM21.3333 16.9993H17V21.3327C17 21.8793 16.5467 22.3327 16 22.3327C15.4533 22.3327 15 21.8793 15 21.3327V16.9993H10.6667C10.12 16.9993 9.66666 16.546 9.66666 15.9993C9.66666 15.4527 10.12 14.9993 10.6667 14.9993H15V10.666C15 10.1193 15.4533 9.66602 16 9.66602C16.5467 9.66602 17 10.1193 17 10.666V14.9993H21.3333C21.88 14.9993 22.3333 15.4527 22.3333 15.9993C22.3333 16.546 21.88 16.9993 21.3333 16.9993Z"
        fill="#A6B7D4"
      />
    </SvgIcon>
  )
}

export const UnChecked = () => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      sx={{
        width: '24px',
        height: '24px',
        fill: 'none',
      }}
    >
      <rect
        x="0.5"
        y="0.5"
        width="23"
        height="23"
        rx="3.5"
        fill="white"
        stroke="#CCCCCC"
      />
    </SvgIcon>
  )
}

export const Checked = () => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      sx={{
        width: '24px',
        height: '24px',
        fill: 'none',
      }}
    >
      <rect
        x="0.5"
        y="0.5"
        width="23"
        height="23"
        rx="3.5"
        fill="white"
        stroke="#443DF6"
      />
      <path
        d="M9.67929 11.7661C9.27398 11.391 8.64129 11.4154 8.26613 11.8207C7.89097 12.226 7.91541 12.8587 8.32071 13.2339L9.67929 11.7661ZM11.7009 15L11.0216 15.7339C11.2228 15.9201 11.4915 16.0155 11.765 15.9979C12.0386 15.9804 12.2929 15.8513 12.4686 15.6409L11.7009 15ZM16.6427 10.6409C16.9966 10.2169 16.9398 9.58628 16.5159 9.23234C16.0919 8.8784 15.4613 8.93518 15.1073 9.35914L16.6427 10.6409ZM8.32071 13.2339L11.0216 15.7339L12.3802 14.2661L9.67929 11.7661L8.32071 13.2339ZM12.4686 15.6409L16.6427 10.6409L15.1073 9.35914L10.9332 14.3591L12.4686 15.6409Z"
        fill="#443DF6"
      />
    </SvgIcon>
  )
}

export const CategoriesSettings = () => {
  return (
    <SvgIcon
      viewBox="0 0 48 48"
      sx={{
        width: '48px',
        height: '48px',
      }}
    >
      <rect width="48" height="48" rx="24" fill="#FAFAFA" />
      <path d="M19.24 14H17.34C15.15 14 14 15.15 14 17.33V19.23C14 21.41 15.15 22.56 17.33 22.56H19.23C21.41 22.56 22.56 21.41 22.56 19.23V17.33C22.57 15.15 21.42 14 19.24 14Z" />
      <path d="M30.67 14H28.77C26.59 14 25.44 15.15 25.44 17.33V19.23C25.44 21.41 26.59 22.56 28.77 22.56H30.67C32.85 22.56 34 21.41 34 19.23V17.33C34 15.15 32.85 14 30.67 14Z" />
      <path d="M30.67 25.4297H28.77C26.59 25.4297 25.44 26.5797 25.44 28.7597V30.6597C25.44 32.8397 26.59 33.9897 28.77 33.9897H30.67C32.85 33.9897 34 32.8397 34 30.6597V28.7597C34 26.5797 32.85 25.4297 30.67 25.4297Z" />
      <path d="M19.24 25.4297H17.34C15.15 25.4297 14 26.5797 14 28.7597V30.6597C14 32.8497 15.15 33.9997 17.33 33.9997H19.23C21.41 33.9997 22.56 32.8497 22.56 30.6697V28.7697C22.57 26.5797 21.42 25.4297 19.24 25.4297Z" />
    </SvgIcon>
  )
}

export const PermissionsSettings = () => {
  return (
    <SvgIcon
      viewBox="0 0 48 48"
      sx={{
        width: '48px',
        height: '48px',
      }}
    >
      <rect width="48" height="48" rx="24" fill="#FAFAFA" />
      <path d="M30.5 16.1103L25.51 14.2403C24.68 13.9303 23.32 13.9303 22.49 14.2403L17.5 16.1103C16.35 16.5403 15.41 17.9003 15.41 19.1203V26.5503C15.41 27.7303 16.19 29.2803 17.14 29.9903L21.44 33.2003C22.85 34.2603 25.17 34.2603 26.58 33.2003L30.88 29.9903C31.83 29.2803 32.61 27.7303 32.61 26.5503V19.1203C32.59 17.9003 31.65 16.5403 30.5 16.1103ZM23.93 19.0303C25.11 19.0303 26.07 19.9903 26.07 21.1703C26.07 22.3303 25.16 23.2603 24.01 23.3003H23.99H23.97C23.95 23.3003 23.93 23.3003 23.91 23.3003C22.71 23.2603 21.81 22.3303 21.81 21.1703C21.8 19.9903 22.76 19.0303 23.93 19.0303ZM26.19 28.3603C25.58 28.7603 24.79 28.9703 24 28.9703C23.21 28.9703 22.41 28.7703 21.81 28.3603C21.24 27.9803 20.93 27.4603 20.92 26.8903C20.92 26.3303 21.24 25.7903 21.81 25.4103C23.02 24.6103 24.99 24.6103 26.2 25.4103C26.77 25.7903 27.09 26.3103 27.09 26.8803C27.08 27.4403 26.76 27.9803 26.19 28.3603Z" />
    </SvgIcon>
  )
}

export const Close = () => {
  return (
    <SvgIcon
      viewBox="0 0 32 32"
      sx={{
        width: '32px',
        height: '32px',
      }}
    >
      <path
        d="M12.2266 19.7732L19.7732 12.2266"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M19.7732 19.7732L12.2266 12.2266"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M11.9998 29.3337H19.9998C26.6665 29.3337 29.3332 26.667 29.3332 20.0003V12.0003C29.3332 5.33366 26.6665 2.66699 19.9998 2.66699H11.9998C5.33317 2.66699 2.6665 5.33366 2.6665 12.0003V20.0003C2.6665 26.667 5.33317 29.3337 11.9998 29.3337Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </SvgIcon>
  )
}

export const AddSVG = () => {
  return (
    <SvgIcon
      viewBox="0 0 20 20"
      sx={{
        width: '20px',
        height: '20px',
      }}
    >
      <path
        d="M5 10H15"
        stroke="#6500E0"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10 15V5"
        stroke="#6500E0"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgIcon>
  )
}

export const UserProfileSVG = () => {
  return (
    <SvgIcon
      viewBox="0 0 70 70"
      sx={{
        width: {
          xs: '50px',
          lg: '70px',
        },
        height: {
          xs: '50px',
          lg: '70px',
        },
      }}
    >
      <rect width="70" height="70" rx="12" fill="#FEEEE7" />
      <path
        d="M27.7377 25.8123C27.7377 21.8072 30.9951 18.5498 35.0002 18.5498C39.0047 18.5498 42.2617 21.8061 42.2627 25.8104C42.2463 29.7399 39.1829 32.9107 35.2787 33.0573H35.2786H35.2786H35.2785H35.2785H35.2784H35.2784H35.2783H35.2783H35.2782H35.2782H35.2781H35.2781H35.278H35.278H35.2779H35.2779H35.2778H35.2778H35.2777H35.2776H35.2776H35.2775H35.2775H35.2774H35.2774H35.2773H35.2773H35.2772H35.2772H35.2771H35.2771H35.277H35.2769H35.2769H35.2768H35.2768H35.2767H35.2767H35.2766H35.2766H35.2765H35.2765H35.2764H35.2763H35.2763H35.2762H35.2762H35.2761H35.2761H35.276H35.276H35.2759H35.2758H35.2758H35.2757H35.2757H35.2756H35.2756H35.2755H35.2754H35.2754H35.2753H35.2753H35.2752H35.2751H35.2751H35.275H35.275H35.2749H35.2749H35.2748H35.2747H35.2747H35.2746H35.2746H35.2745H35.2744H35.2744H35.2743H35.2743H35.2742H35.2741H35.2741H35.274H35.274H35.2739H35.2738H35.2738H35.2737H35.2736H35.2736H35.2735H35.2735H35.2734H35.2733H35.2733H35.2732H35.2731H35.2731H35.273H35.2729H35.2729H35.2728H35.2727H35.2727H35.2726H35.2725H35.2725H35.2724H35.2724H35.2723H35.2722H35.2721H35.2721H35.272H35.2719H35.2719H35.2718H35.2717H35.2717H35.2716H35.2715H35.2715H35.2714H35.2713H35.2713H35.2712H35.2711H35.271H35.271H35.2709H35.2708H35.2708H35.2707H35.2706H35.2705H35.2705H35.2704H35.2703H35.2702H35.2702H35.2701H35.27H35.2699H35.2699H35.2698H35.2697H35.2696H35.2696H35.2695H35.2694H35.2693H35.2693H35.2692H35.2691H35.269H35.269H35.2689H35.2688H35.2687H35.2686H35.2686H35.2685H35.2684H35.2683H35.2682H35.2681H35.2681H35.268H35.2679H35.2678H35.2677H35.2677H35.2676H35.2675H35.2674H35.2673H35.2672H35.2671H35.2671H35.267H35.2669H35.2668H35.2667H35.2666H35.2665H35.2665H35.2664H35.2663H35.2662H35.2661H35.266H35.2659H35.2658H35.2657H35.2656H35.2656H35.2655H35.2654H35.2653H35.2652H35.2651H35.265H35.2649H35.2648H35.2647H35.2646H35.2645H35.2644H35.2643H35.2642H35.2641H35.264H35.2639H35.2638H35.2637H35.2636H35.2636H35.2635H35.2634H35.2633H35.2632H35.263H35.2629H35.2628H35.2627H35.2625H35.2623H35.2621H35.2619H35.2617H35.2615H35.2613H35.2611H35.2609H35.2607H35.2605H35.2603H35.2601H35.2599H35.2597H35.2595H35.2593H35.2591H35.2589H35.2587H35.2585H35.2583H35.2581H35.2579H35.2577H35.2575H35.2573H35.2572H35.257H35.2568H35.2566H35.2564H35.2562H35.256H35.2558H35.2556H35.2554H35.2552H35.255H35.2548H35.2547H35.2545H35.2543H35.2541H35.2539H35.2537H35.2535H35.2533H35.2531H35.253H35.2528H35.2526H35.2524H35.2522H35.252H35.2518H35.2517H35.2515H35.2513H35.2511H35.2509H35.2507H35.2506H35.2504H35.2502H35.25H35.2498H35.2496H35.2495H35.2493H35.2491H35.2489H35.2487H35.2486H35.2484H35.2482H35.248H35.2478H35.2477H35.2475H35.2473H35.2471H35.247H35.2468H35.2466H35.2464H35.2462H35.2461H35.2459H35.2457H35.2455H35.2454H35.2452H35.245H35.2448H35.2447H35.2445H35.2443H35.2442C35.0788 33.039 34.91 33.0412 34.7553 33.0551C30.7635 32.8821 27.7377 29.7134 27.7377 25.8123Z"
        fill="#F7936F"
        stroke="#F7936F"
        stroke-width="2.1"
      />
      <path
        d="M26.6952 49.1613L26.6924 49.1594C24.6996 47.8308 23.7299 46.1307 23.7299 44.4155C23.7299 42.6996 24.7004 40.9824 26.7092 39.6371C28.9613 38.1472 31.9675 37.3718 35.0218 37.3718C38.0774 37.3718 41.0743 38.1479 43.3075 39.6367C45.2927 40.9602 46.2544 42.6597 46.2699 44.3848C46.2683 46.1169 45.2976 47.8164 43.3039 49.1618C41.0621 50.6667 38.0578 51.4505 34.9999 51.4505C31.9417 51.4505 28.9371 50.6665 26.6952 49.1613Z"
        fill="#F7936F"
        stroke="#F7936F"
        stroke-width="2.1"
      />
    </SvgIcon>
  )
}

export const ArrowBack = () => {
  return (
    <SvgIcon
      viewBox="0 0 16 16"
      sx={{
        width: '16px',
        height: '16px',
      }}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 8C12 8.27614 11.7761 8.5 11.5 8.5H5.70711L7.85355 10.6464C8.04882 10.8417 8.04882 11.1583 7.85355 11.3536C7.65829 11.5488 7.34171 11.5488 7.14645 11.3536L4.14645 8.35355C3.95118 8.15829 3.95118 7.84171 4.14645 7.64645L7.14645 4.64645C7.34171 4.45118 7.65829 4.45118 7.85355 4.64645C8.04882 4.84171 8.04882 5.15829 7.85355 5.35355L5.70711 7.5H11.5C11.7761 7.5 12 7.72386 12 8Z"
        fill="black"
      />
    </SvgIcon>
  )
}

export const UserProfileBlueSVG = () => {
  return (
    <SvgIcon
      viewBox="0 0 50 50"
      sx={{
        width: '50px',
        height: '50px',
      }}
    >
      <rect width="50" height="50" rx="12" fill="#E9F4FB" />
      <path
        d="M25 15C22.38 15 20.25 17.13 20.25 19.75C20.25 22.32 22.26 24.4 24.88 24.49C24.96 24.48 25.04 24.48 25.1 24.49C25.12 24.49 25.13 24.49 25.15 24.49C25.16 24.49 25.16 24.49 25.17 24.49C27.73 24.4 29.74 22.32 29.75 19.75C29.75 17.13 27.62 15 25 15Z"
        fill="#6500E0"
      />
      <path
        d="M30.08 27.1509C27.29 25.2909 22.74 25.2909 19.93 27.1509C18.66 28.0009 17.96 29.1509 17.96 30.3809C17.96 31.6109 18.66 32.7509 19.92 33.5909C21.32 34.5309 23.16 35.0009 25 35.0009C26.84 35.0009 28.68 34.5309 30.08 33.5909C31.34 32.7409 32.04 31.6009 32.04 30.3609C32.03 29.1309 31.34 27.9909 30.08 27.1509Z"
        fill="#6500E0"
      />
    </SvgIcon>
  )
}
