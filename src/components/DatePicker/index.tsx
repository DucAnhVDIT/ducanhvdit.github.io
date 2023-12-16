import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createTheme } from '@mui/material/styles'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default function DatePickerMUI() {
  const newTheme = (theme:any) => createTheme({
    ...theme,
    components: {
      MuiPickersToolbar: {
        styleOverrides: {
          root: {
            color: '#1565c0',
            borderRadius: 20,
            borderWidth: 0,
            borderColor: '#2196f3',
            border: '0px solid',
            backgroundColor: '#bbdefb',
          }
        }
      }
    }
  })
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          sx={{
            '.MuiPickersToolbar-root': {
              color: '#1565c0',
              borderRadius: 20,
              borderWidth: 0,
              borderColor: '#2196f3',
              border: '0px solid',
              backgroundColor: '#bbdefb',
            },
          }}
        />
      </LocalizationProvider>
    </div>
  );
}
