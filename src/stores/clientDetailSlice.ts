import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   firstName: '',
   lastName:'',
   email:''
};

export const clientDetailSlice = createSlice({
    name: 'clientDetail',
    initialState,
    reducers: {
       
    },
});

export const {  } = clientDetailSlice.actions;


export default clientDetailSlice.reducer;
