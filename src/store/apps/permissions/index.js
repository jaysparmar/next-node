// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import api from 'src/interceptors/api'

// ** Fetch Permissions Thunk
export const fetchPermissions = createAsyncThunk('appPermissions/fetchPermissions', async () => {
  const response = await api.post('/api/admin/permissions-get')

  return response
})

export const appPermissionsSlice = createSlice({
  name: 'appPermissions',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    userPermissions: []
  },
  reducers: {
    updatePermissions: (state, action) => {
      state.userPermissions = action.payload

      localStorage.setItem('userPermissions', JSON.stringify(action.payload))
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchPermissions.fulfilled, (state, action) => {
      state.data = action.payload.data

      // state.params = action.payload.params
      state.allData = action.payload.data

      // state.total = action.payload.total
    })
  }
})

export const { updatePermissions } = appPermissionsSlice.actions

export default appPermissionsSlice.reducer
