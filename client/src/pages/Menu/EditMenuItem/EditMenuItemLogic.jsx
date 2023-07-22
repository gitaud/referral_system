import React from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import EditMenuItemView from './EditMenuItemView';
import Swal from 'sweetalert2';

const EditMenuItemSchema = yup.object().shape({
	name: yup.string().required()
});

const EditMenuItemLogic = ({ defaultValues, onSubmit }) => {

	const navigate = useNavigate();

	const form = useForm({
		mode: "onSubmit",
		defaultValues,
		resolver: yupResolver(EditMenuItemSchema)
	});

	const handleSubmit = async (data) => {
		try {
			Swal.fire({
				title: 'Saving',
				timer: 2000,
				didOpen: () => Swal.showLoading(),
			})
			await onSubmit(defaultValues._id, data);
			setTimeout(() => {
				Swal.fire({
					icon: 'success',
					title: 'Menu Item updated',
					showConfirmButton: true,
					timer: 2000
				})
			}, 1500);
			navigate(`/menu/categories/${defaultValues.category}`)
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Oops',
				text: `${error?.cause?.response?.data || "Something went wrong!"}`
			});
		}
	}

	return (<EditMenuItemView form={form} onSubmit={handleSubmit} />)
}

export default EditMenuItemLogic;