import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CreateMenuItemView from './CreateMenuItemView';
import Swal from 'sweetalert2';

const CreateMenuItemFormSchema = yup.object().shape({
	name: yup.string().required(),
	price: yup.number().required()
});

const CreateMenuItemLogic = ({ defaultValues, onSubmit }) => {
	const name = useLocation().state;
	const categoryId = useParams().id;
	const navigate = useNavigate();

	const form = useForm({
		mode: "onSubmit",
		defaultValues,
		resolver: yupResolver(CreateMenuItemFormSchema)
	});

	const handleSubmit = async (data) => {
		try {
			Swal.fire({
				title: 'Saving',
				timer: 2000,
				didOpen: () => Swal.showLoading(),
			})
			const itemData = {
				name: data.name,
				price: data.price,
				category: categoryId,
			}
			const updatedCategory = await onSubmit(itemData);
			setTimeout(() => {
				Swal.fire({
					icon: 'success',
					title: 'Menu Item created!',
					showConfirmButton: true,
					timer: 2000
				})
			}, 1500)
			navigate(`/menu/categories/${updatedCategory._id}`)
		} catch (error) {
			console.log(error);
			Swal.fire({
				icon: 'error',
				title: 'Oops',
				text: `${error?.cause?.response?.data || "Something went wrong!"}`
			});
		}
	}

	return (<CreateMenuItemView name={name} form={form} onSubmit={handleSubmit} />)
}

export default CreateMenuItemLogic;