import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import EditUserFormView from './EditUserFormView';
import Swal from 'sweetalert2';

const EditUserFormSchema = yup.object().shape({
	name: yup.string().required(),
	email: yup.string().email().required(),
	phone: yup.string().required(),
	isAdmin: yup.boolean().required(),
});

const EditUserFormLogic = ({ id, defaultValues, onSubmit }) => {
	const navigate = useNavigate();
	const form = useForm({
		mode: "onSubmit",
		defaultValues,
		resolver: yupResolver(EditUserFormSchema)
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
					title: 'User info saved',
					showConfirmButton: true,
					timer: 2000
				})
			}, 1500)
			navigate(`/user/${id}`);
		} catch(error) {
			console.log(error);
			Swal.fire({
				icon: 'error',
				title: 'Oops',
				text: 'Something went wrong!'
			});
			console.log(error);
		}
	}

	return (<EditUserFormView form={form} user={defaultValues} onSubmit={handleSubmit} />)
}

export default EditUserFormLogic;