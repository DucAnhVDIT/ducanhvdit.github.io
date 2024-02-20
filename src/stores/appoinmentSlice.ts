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
        cancelAppointment: (state, action: PayloadAction<string>) => {
            const appointmentId = action.payload;
            state.scheduleData = state.scheduleData.filter((appointment: { ID: string; }) => appointment.ID !== appointmentId);
        },
    }
})

export const {setScheduleData, cancelAppointment } = appointmentSlice.actions
export default appointmentSlice.reducer