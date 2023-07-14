import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { useUserContext } from '../../../context/UserContext';
import CreateTransactionFormView from './CreateTransactionFormView';

const CreateUserFormSchema = yup.object().shape({
	amount: yup.number().required() 
});

const CreateUserFormLogic = ({ defaultValues, onSubmit }) => {
	const { user } = useUserContext();
	const navigate = useNavigate();

	const form = useForm({
		mode: "onSubmit",
		defaultValues,
		resolver: yupResolver(CreateUserFormSchema)
	});

	const handleSubmit = async (data) => {
		const transactionData = {
			customer_id: user.user._id,
			amount: data.amount,
			customer_level_id: user.user.level
		}
		try {
			Swal.fire({
				title: 'Saving',
				timer: 2000,
				didOpen: () => Swal.showLoading(),
			})
			const newTransaction = await onSubmit(transactionData);
			setTimeout(() => {
				Swal.fire({
					icon: 'success',
					title: 'Transaction saved',
					showConfirmButton: true,
					timer: 2000
				}).then(result => {
					if (result.isConfirmed) {
						navigate(`/transaction/${newTransaction._id}`);
					}
				})
			}, 1500)
		} catch (error) {
			console.log(error);
			Swal.fire({
				icon: 'error',
				title: 'Oops',
				text: `${error?.cause?.response?.data || "Something went wrong!"}`
			});
		}
	}

	return (<CreateTransactionFormView form={form} customerData={user.user} onSubmit={handleSubmit} />)
}

export default CreateUserFormLogic;