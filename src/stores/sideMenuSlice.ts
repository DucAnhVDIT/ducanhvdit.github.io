import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'
import { icons } from '../base-components/Lucide'

export interface Menu {
  icon: keyof typeof icons
  title: string
  pathname?: string
  subMenu?: Menu[]
  ignore?: boolean
}

export interface SideMenuState {
  menu: Array<Menu | 'divider'>
}

const initialState: SideMenuState = {
  menu: [
    {
      icon: 'Calendar',
      pathname: '/',
      title: 'Calendar',
    },
    {
      icon: 'Users',
      pathname: '/clients',
      title: 'Clients',
    },
    // {
    //   icon: 'AlarmPlus',
    //   pathname: '/marketing',
    //   title: 'Marketing',
    // },
    // {
    //   icon: 'ShoppingCart',
    //   pathname: '/purchase',
    //   title: 'Purchase',
    // },
    {
      icon: 'Settings',
      pathname: '/manager',
      title: 'Manager',
    },
  ],
}

export const sideMenuSlice = createSlice({
  name: 'sideMenu',
  initialState,
  reducers: {},
})

export const selectSideMenu = (state: RootState) => state.sideMenu.menu

export default sideMenuSlice.reducer
