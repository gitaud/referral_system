import React, { useState } from 'react';
import DatePickerComponent from './DatePickerComponent';
import { useDateFilterContext, setDates } from '../../context/DateFilterContext';
import styles from './DatePicker.module.css';

const DatePickerView = () => {
	const { dispatch } = useDateFilterContext();
	const [ dateGte, setDateGte ] = useState(null);
	const [ dateLte, setDateLte ] = useState(null);
	
	const handleSubmit = () => {
		dispatch(setDates({
			date_gte: dateGte.toDate().toDateString(),
			date_lte: dateLte.toDate().toDateString(),
		}))
	}
	
	return(
		<div className={styles.container}>
			<div className={styles.dateField}>
				<DatePickerComponent
					label={"Start Date"} 
					value={dateGte}
					handleChange={(value) => setDateGte(value)} 
				/>
			</div>
			<div className={styles.dateField}>
				<DatePickerComponent 
					label={"End Date"}
					value={dateLte} 
					handleChange={(value) => setDateLte(value)}
				/>
			</div>
			<button className={styles.submitButton} onClick={handleSubmit}>Set Date Filter</button>
		</div>
	)
}

export default DatePickerView;