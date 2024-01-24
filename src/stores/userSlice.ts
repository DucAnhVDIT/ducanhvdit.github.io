import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      FirstName: null,
      LastName: null,
      Email: null,
      UserLevel: null,
      BusinessModel: [],
    },
  },
  reducers: {
    setCredentials: (state, action) => {
      const user = action.payload.Account
      state.user.FirstName = user.FirstName
      state.user.LastName = user.LastName
      state.user.Email = user.Email
      state.user.UserLevel = user.UserLevel
      state.user.BusinessModel = user.BusinessModel
    },
    logOut: (state, action) => {
      state.user = {
        FirstName: null,
        LastName: null,
        Email: null,
        UserLevel: null,
        BusinessModel: [],
      }
    },
  },
})

export const { setCredentials, logOut } = userSlice.actions

export default userSlice.reducer

export const selectCurrentUser = (state: any) => state.auth
