// store/scheduleSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Schedule {
  StaffID: number;
  SheduleDate: string;
  StartTime1: string | null;
  EndTime1: string | null;
  [key: string]: any; // Additional properties
}

interface ScheduleState {
  scheduleData: Schedule[];
  dates: string[];
  loading: boolean;
  error: string | null;
}

const initialState: ScheduleState = {
  scheduleData: [],
  dates: [],
  loading: false,
  error: null,
};

export const scheduleSlice = createSlice({
  name: 'schedules',
  initialState,
  reducers: {
    setScheduleData: (state, action: PayloadAction<Schedule[]>) => {
      state.scheduleData = action.payload;
    },
    setDates: (state, action: PayloadAction<string[]>) => {
      state.dates = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setScheduleData, setDates, setLoading, setError } = scheduleSlice.actions;

export const selectScheduleData = (state: { schedules: ScheduleState }) => state.schedules.scheduleData;
export const selectDates = (state: { schedules: ScheduleState }) => state.schedules.dates;
export const selectLoading = (state: { schedules: ScheduleState }) => state.schedules.loading;
export const selectError = (state: { schedules: ScheduleState }) => state.schedules.error;

export default scheduleSlice.reducer;
