// notesSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    companyNotes: '',
    customerNotes: '',
  },
  reducers: {
    setCompanyNotes: (state, action) => {
      state.companyNotes = action.payload;
    },
    setCustomerNotes: (state, action) => {
      state.customerNotes = action.payload;
    },
  },
});

export const { setCompanyNotes, setCustomerNotes } = notesSlice.actions;
export const selectNotes = (state: { notes: any; }) => state.notes;

export default notesSlice.reducer;
