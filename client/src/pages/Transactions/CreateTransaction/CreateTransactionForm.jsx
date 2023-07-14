import React from 'react';
import useSetDocumentTitle from '../../../common-hooks/setDocumentTitle';
import { useAuthContext } from '../../../context/AuthContext';
import { UserContextProvider } from '../../../context/UserContext';
import { createTransaction } from '../../../apiCalls/transactionApiCalls';
import CreateTransactionFormLogic from './CreateTransactionFormLogic';

const InnerCreateTransactionForm = () => {
	useSetDocumentTitle("Create New Transaction");
	const { user } = useAuthContext();

	const handleSubmit = async (data) => {
		const transactionData = {
			...data,
			recorded_by: user.id
		}
		return createTransaction(user.authToken, transactionData);
	}

	const defaultValues = {
		amount: 0,
	}


	return (<CreateTransactionFormLogic defaultValues={defaultValues} onSubmit={handleSubmit} />)
}

export default function CreateTransactionForm() {
	return(
		<UserContextProvider>
			<InnerCreateTransactionForm />
		</UserContextProvider>
	)
};