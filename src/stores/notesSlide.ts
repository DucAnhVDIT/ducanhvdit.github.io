// notesSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    companyNotes: '',
    customerNotes: '',
    hasNotes: false
  },
  reducers: {
    setCompanyNotes: (state, action) => {
      state.companyNotes = action.payload;
    },
    setCustomerNotes: (state, action) => {
      state.customerNotes = action.payload;
    },
    resetCompanyNotes: (state) => {
      state.companyNotes = '';
    },
    resetCustomerNotes: (state) => {
      state.customerNotes = '';
    },
    setHasNotes: (state, action) => {
      state.hasNotes = action.payload
    }
  },
});

export const { setCompanyNotes, setCustomerNotes, resetCompanyNotes, resetCustomerNotes, setHasNotes } = notesSlice.actions;
export const selectNotes = (state: { notes: any; }) => state.notes;

export default notesSlice.reducer;
