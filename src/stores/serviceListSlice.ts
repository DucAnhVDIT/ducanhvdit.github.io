import { createSlice } from '@reduxjs/toolkit'

const serviceListSlice = createSlice({
    name: 'serviceList',
    initialState: {
      selectedServices : <any>[]
    },
    reducers: {
        addService:(state, action) => {
            state.selectedServices.push(action.payload);
        },
        deleteService:(state) => {

        }
    }
})

export const { addService, deleteService } = serviceListSlice.actions
export default serviceListSlice.reducer