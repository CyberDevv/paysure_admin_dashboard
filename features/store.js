import { configureStore } from '@reduxjs/toolkit'

import userSlice from './userSlice'
import TransTypesSlice from './transTypes'
import PartnerClassSlice from './partnerClassSlice'

export default configureStore({
  reducer: {
    user: userSlice,
    partnerClass: PartnerClassSlice,
    transTypes: TransTypesSlice,
  },
})
