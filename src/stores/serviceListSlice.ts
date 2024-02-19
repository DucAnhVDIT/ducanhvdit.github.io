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
        deleteService: (state, action) => {
            const serviceIdToDelete = action.payload;
            state.selectedServices = state.selectedServices.filter((service: { ProductID: any; }) => service.ProductID !== serviceIdToDelete);
        },
        resetSelectedServices: (state) => {
            state.selectedServices = [];
          },
    }
})

export const { addService, deleteService, resetSelectedServices } = serviceListSlice.actions
export default serviceListSlice.reducer