import { configureStore } from '@reduxjs/toolkit'

import userSlice from './userSlice'
import PartnerClassSlice from './partnerClassSlice'

export default configureStore({
  reducer: {
    user: userSlice,
    partnerClass: PartnerClassSlice,
  },
})
