import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, success: false },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, authsSuccess } = action.payload
      state.user = user
      state.token = accessToken
      state.success = authsSuccess
    },
    logOut: (state, action) => {
      state.user = null
      state.token = null
      state.success = false
    },
  },
})

export const { setCredentials, logOut } = userSlice.actions

export default userSlice.reducer

export const selectCurrentUser = (state: any) => state.auth.user
export const selectToken = (state: any) => state.auth.token
export const authSuccess = (state: any) => state.auth.success
