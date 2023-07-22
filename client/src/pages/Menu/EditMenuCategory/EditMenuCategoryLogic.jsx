import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import EditMenuCategoryView from './EditMenuCategoryView';
import Swal from 'sweetalert2';

const EditMenuCategorySchema = yup.object().shape({
	name: yup.string().required()
});

const EditMenuCategoryLogic = ({ defaultValues, onSubmit }) => {
	const navigate = useNavigate();
	const categoryId = useParams().id;

	const form = useForm({
		mode: "onSubmit",
		defaultValues,
		resolver: yupResolver(EditMenuCategorySchema)
	});

	const handleSubmit = async (data) => {
		try {
			Swal.fire({
				title: 'Saving',
				timer: 2000,
				didOpen: () => Swal.showLoading(),
			})
			await onSubmit(categoryId, data);
			setTimeout(() => {
				Swal.fire({
					icon: 'success',
					title: 'Menu Category updated',
					showConfirmButton: true,
					timer: 2000
				})
			}, 1500);
			navigate(`/menu/categories/${categoryId}`)
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Oops',
				text: 'Something went wrong!'
			});
		}
	}

	return (<EditMenuCategoryView form={form} category={defaultValues} onSubmit={handleSubmit} />)
}

export default EditMenuCategoryLogic;