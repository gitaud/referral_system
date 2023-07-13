import React from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { createTransaction } from '../../../apiCalls/transactionApiCalls';
import AddTransactionFormLogic from './AddTransactionFormLogic';

const AddTransactionForm = ({ usrData }) => {
	const { user } = useAuthContext();

	const defaultValues = {
		amount: 0,
	};

	const handleSubmit = async (data) => {
		const submissionData = {
			customer_id: usrData._id,
			amount: data.amount,
			customer_level_id: usrData.level,
			recorded_by: user.id,
		}
		console.log(submissionData);
		return createTransaction(user.authToken, submissionData);
	}
	return (<AddTransactionFormLogic usrData={usrData} defaultValues={defaultValues} onSubmit={handleSubmit} />)
}

export default AddTransactionForm;