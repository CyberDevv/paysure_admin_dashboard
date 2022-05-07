import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialStateValue = { partnerClass: [], loading: false, error: false }

export const fetchPartnerClass = createAsyncThunk('/partnerClass', async () => {
  const url = `/api/partnerClass/listPartnerClass`
  const data = await (await axios(url)).data

  return data
})

const partnerClassSlice = createSlice({
  name: 'partnerClass',
  initialState: initialStateValue,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPartnerClass.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchPartnerClass.fulfilled, (state, action) => {
      ;(state.partnerClass = action.payload), (state.loading = false)
    })
    builder.addCase(fetchPartnerClass.rejected, state => {
      state.error = true
    })
  },
})

export default partnerClassSlice.reducer
