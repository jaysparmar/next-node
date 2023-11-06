// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const registrationSlice = createSlice({
  name: 'registrationData',
  initialState: {
    registrationData: {}
  },
  reducers: {
    setRegistrationData: (state, action) => {
      state.registrationData = action.payload
    }
  }
})

export const { setRegistrationData } = registrationSlice.actions

export default registrationSlice.reducer
