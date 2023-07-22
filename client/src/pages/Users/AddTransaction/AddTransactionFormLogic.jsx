import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AddTransactionFormView from './AddTransactionFormView';
import Swal from 'sweetalert2';

const AddTransactionFormSchema = yup.object().shape({
	amount: yup.number().required(),
});

const AddTransactionFormLogic = ({ usrData, defaultValues, onSubmit }) => {
	const form = useForm({
		mode: "onSubmit",
		defaultValues,
		resolver: yupResolver(AddTransactionFormSchema)
	});

	const handleSubmit = async (data) => {
		try {
			Swal.fire({
				title: 'Saving',
				timer: 2000,
				didOpen: () => Swal.showLoading(),
			})
			await onSubmit(data);
			setTimeout(() => {
				Swal.fire({
					icon: 'success',
					title: 'Transaction saved',
					showConfirmButton: true,
					timer: 2000
				})
			}, 1500);
			window.location.reload();
		} catch (error) {
			console.log(error);
			Swal.fire({
				icon: 'error',
				title: 'Oops',
				text: 'Something went wrong!'
			});
			console.log(error);
		}
	}

	return (<AddTransactionFormView form={form} user={usrData} onSubmit={handleSubmit} />)
}

export default AddTransactionFormLogic;