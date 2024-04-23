import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const rebookSlice = createSlice({
  name: "rebook",
  initialState: {
    rebook: false,
    appointmentToRebook: <any>{},
    date: new Date()
  },
  reducers: {
    setRebook: (state, action) => {
      state.rebook = action.payload;
    },
    setAppToRebook: (state, action: PayloadAction<any>) => {
      state.appointmentToRebook = action.payload;
    },
    resetAppToRebook: (state) => {
      state.appointmentToRebook = null;
    },
    setRebookDate: (state, action) => {
      state.date = action.payload
    }
  },
});

export const { setRebook, setAppToRebook, resetAppToRebook, setRebookDate } =
  rebookSlice.actions;

export default rebookSlice.reducer;
