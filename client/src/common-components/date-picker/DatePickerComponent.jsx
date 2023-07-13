import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DatePickerComponent = ({ label, value, handleChange }) => {
	return(
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<DatePicker 
				label={label}
				value={value}
				onChange={newValue => handleChange(newValue)}
				disableFuture
			/>
		</LocalizationProvider>
	)
}

export default DatePickerComponent;