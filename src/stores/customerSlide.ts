import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedCustomer: null,
};

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        setSelectedCustomer: (state, action) => {
            state.selectedCustomer = action.payload;
        },
    },
});

export const { setSelectedCustomer } = customerSlice.actions;

export const selectSelectedCustomer = (state: { customer: { selectedCustomer: any; }; }) => state.customer.selectedCustomer;

export default customerSlice.reducer;
