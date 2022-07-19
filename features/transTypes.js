import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialStateValue = { transTypes: [], loading: false, error: false }

export const fetchtransTypes = createAsyncThunk('/transTypes', async () => {
  const url = `/api/users/transList`
  const data = await (await axios(url)).data

  return data
})

const transTypesSlice = createSlice({
  name: 'transTypes',
  initialState: initialStateValue,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchtransTypes.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchtransTypes.fulfilled, (state, action) => {
      ;(state.transTypes = action.payload), (state.loading = false)
    })
    builder.addCase(fetchtransTypes.rejected, state => {
      state.error = true
    })
  },
})

export default transTypesSlice.reducer
