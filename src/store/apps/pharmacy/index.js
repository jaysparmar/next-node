// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const registrationSlice = createSlice({
  name: 'registrationData',
  initialState: {
    registrationData: {},
    userData: {}
  },
  reducers: {
    setRegistrationData: (state, action) => {
      state.registrationData = action.payload
    },
    setUserData: (state, action) => {
      state.userData = action.payload
    }
  }
})

export const { setRegistrationData, setUserData } = registrationSlice.actions

export default registrationSlice.reducer
