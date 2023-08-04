import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CreateMenuCategoryView from './CreateMenuCategoryView';
import Swal from 'sweetalert2';

const CreateMenuCategoryFormSchema = yup.object().shape({
	name: yup.string().required(),
});

const CreateMenuCategoryLogic = ({ defaultValues, onSubmit }) => {
	const navigate = useNavigate();

	const form = useForm({
		mode: "onSubmit",
		defaultValues,
		resolver: yupResolver(CreateMenuCategoryFormSchema)
	});

	const handleSubmit = async (data) => {
		const categoryData = {
			name: data.name,
		}
		try {
			Swal.fire({
				title: 'Saving',
				timer: 2000,
				didOpen: () => Swal.showLoading(),
			})
			const newCategory = await onSubmit(categoryData);
			setTimeout(() => {
				Swal.fire({
					icon: 'success',
					title: 'Category created!',
					showConfirmButton: true,
					timer: 2000
				})
			}, 1500)
			navigate(`/menu/categories/${newCategory._id}`, { state: newCategory });
		} catch (error) {
			console.log(error);
			Swal.fire({
				icon: 'error',
				title: 'Oops',
				text: "Something went wrong!"
			});
		}
	}

	return (<CreateMenuCategoryView form={form} onSubmit={handleSubmit} />)
}

export default CreateMenuCategoryLogic;