import { createSlice } from '@reduxjs/toolkit'

const serviceListSlice = createSlice({
    name: 'serviceList',
    initialState: {
      selectedServices : <any>[]
    },
    reducers: {
        addService:(state) => {

        },
        deleteService:(state) => {

        }
    }
})

export const { addService, deleteService } = serviceListSlice.actions
export default serviceListSlice.reducer