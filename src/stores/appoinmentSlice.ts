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
        deleteAppointment: (state, action: PayloadAction<string>) => {
            const appointmentId = action.payload;
            state.scheduleData = state.scheduleData.filter((appointment: { ID: string; }) => appointment.ID !== appointmentId);
        },
        updateStatus: (state, action: PayloadAction<{ appointmentId: string; statusId: number; color: string }>) => {
            const { appointmentId, statusId, color } = action.payload;
        
            console.log('Updating status for appointmentId:', appointmentId);
            console.log('New statusId:', statusId);
            console.log('New color:', color);
        
            state.scheduleData = state.scheduleData.map((appointment: { ID: string; StatusID: number; Colour: string }) => {
                if (appointment.ID === appointmentId) {
                    console.log('Updating status for appointment:', appointment);
                    return {
                        ...appointment,
                        StatusID: statusId,
                        Colour: color, // Include the color information in the state
                    };
                }
                return appointment;
            });
        
            console.log('Updated state:', state.scheduleData);
        
            // Return the updated state
        },
    }
})

export const {setScheduleData, deleteAppointment, updateStatus } = appointmentSlice.actions
export default appointmentSlice.reducer