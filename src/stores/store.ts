import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import darkModeReducer from './darkModeSlice'
import colorSchemeReducer from './colorSchemeSlice'
import sideMenuReducer from './sideMenuSlice'
import simpleMenuReducer from './simpleMenuSlice'
import topMenuReducer from './topMenuSlice'
import authReducer from './userSlice'
import serviceListReducer from './serviceListSlice'

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    colorScheme: colorSchemeReducer,
    sideMenu: sideMenuReducer,
    simpleMenu: simpleMenuReducer,
    topMenu: topMenuReducer,
    authState: authReducer,
    serviceListState: serviceListReducer
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
