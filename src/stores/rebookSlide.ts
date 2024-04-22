
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const rebookSlice = createSlice({
  name: 'rebook',
  initialState: {
    rebook: false,
    appointmentToRebook: <any>{},
  },
  reducers: {
    setRebook: (state, action) => {
        state.rebook = action.payload;
    },
    setAppToRebook: (state, action: PayloadAction<any>) => {
        state.appointmentToRebook = action.payload;
      },
  },
});

export const { setRebook, setAppToRebook } = rebookSlice.actions;


export default rebookSlice.reducer;
