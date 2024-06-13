import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import darkModeReducer from './darkModeSlice'
import colorSchemeReducer from './colorSchemeSlice'
import sideMenuReducer from './sideMenuSlice'
import simpleMenuReducer from './simpleMenuSlice'
import topMenuReducer from './topMenuSlice'
import authReducer from './userSlice'
import billReducer from './billSlice'
import serviceListReducer from './serviceListSlice'
import appointmentReducer from './appoinmentSlice'
// import dateReducer from './dateSlice';
import notesReducer from './notesSlide'
import customerReducer from './customerSlide'
import rebookReducer from './rebookSlide'
import scheduleReducer from './scheduleSlice';

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    colorScheme: colorSchemeReducer,
    sideMenu: sideMenuReducer,
    simpleMenu: simpleMenuReducer,
    topMenu: topMenuReducer,
    authState: authReducer,
    bill: billReducer,
    serviceListState: serviceListReducer,
    appointment : appointmentReducer,
    notes: notesReducer,
    customer:customerReducer,
    rebook: rebookReducer,
    schedules: scheduleReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
