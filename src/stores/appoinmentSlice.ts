import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const appointmentSlice = createSlice({
    name: 'appointment',
    initialState: {
        scheduleData: <any>[]
    },
    reducers: {
        setScheduleData: (state, action: PayloadAction<any[]>) => {
            state.scheduleData = action.payload;
          },
    }
})

export const {setScheduleData } = appointmentSlice.actions
export default appointmentSlice.reducer