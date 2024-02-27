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
        updateStatus: (state, action: PayloadAction<{ customerID: string; statusId: number; color: string }>) => {
            const { customerID, statusId, color } = action.payload;
          
            state.scheduleData = state.scheduleData.map((appointment: { ID: string; CustomerID: string; StatusID: number; Colour: string }) => {
              if (appointment.CustomerID === customerID) {
                return {
                  ...appointment,
                  StatusID: statusId,
                  Colour: color,
                };
              }
              return appointment;
            });
          }
          
    }
})

export const {setScheduleData, deleteAppointment, updateStatus,setAppointmentToCustomer } = appointmentSlice.actions
export default appointmentSlice.reducer