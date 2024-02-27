import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const appointmentSlice = createSlice({
    name: 'appointment',
    initialState: {
        scheduleData: <any>[],
        singleCustomerAppointment: {}
    },
    reducers: {
        setScheduleData: (state, action: PayloadAction<any[]>) => {
            state.scheduleData = action.payload;
          },
        setAppointmentToCustomer: (state, action: PayloadAction<{}>) => {
            state.singleCustomerAppointment = action.payload;
          },
        deleteAppointment: (state, action: PayloadAction<string>) => {
            const appointmentId = action.payload;
            state.scheduleData = state.scheduleData.filter((appointment: { ID: string; }) => appointment.ID !== appointmentId);
        },
        updateStatus: (state, action: PayloadAction<{ appointmentId: string; statusId: number; color: string }>) => {
            const { appointmentId, statusId, color } = action.payload;
        
            // console.log('Updating status for appointmentId:', appointmentId);
            // console.log('New statusId:', statusId);
            // console.log('New color:', color);
        
            state.scheduleData = state.scheduleData.map((appointment: { ID: string; StatusID: number; Colour: string }) => {
                if (appointment.ID === appointmentId) {
                    // console.log('Updating status for appointment:', appointment);
                    return {
                        ...appointment,
                        StatusID: statusId,
                        Colour: color,
                    };
                }
                return appointment;
            });
        
            // console.log('Updated state:', state.scheduleData);
        },
    }
})

export const {setScheduleData, deleteAppointment, updateStatus,setAppointmentToCustomer } = appointmentSlice.actions
export default appointmentSlice.reducer