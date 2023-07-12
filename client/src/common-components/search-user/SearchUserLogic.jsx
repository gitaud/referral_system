import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { useUserContext, success, failure, initialize } from '../../context/UserContext';
import SearchUserView from './SearchUserView';

const SearchUserSchema = yup.object().shape({
	query: yup.string().required(),
	param: yup.string().required()
})

const SearchUserLogic = ({ defaultValues, onSubmit }) => {

	const { dispatch } = useUserContext();

	const form = useForm({
		mode: "onSubmit",
		defaultValues,
		resolver: yupResolver(SearchUserSchema)
	})

	const handleSubmit = async (data) => {
		try {
			dispatch(initialize());
			const searchParam = data.param + '=' + data.query;
			Swal.fire({
				title: 'Searching',
				timer: 2000,
				didOpen: () => Swal.showLoading(),
			})
			const usrData = await onSubmit(searchParam);
			dispatch(success(usrData));
			setTimeout(() => {
				Swal.fire({
					icon: 'success',
					title: 'Success',
					text: 'User found',
					showConfirmButton: true,
				})
			}, 1000)
		} catch (error) {
			dispatch(failure(error));
			Swal.fire({
				icon: 'error',
				title: 'Oops',
				text: 'Could not find user!'
			})
		}
	}

	return (<SearchUserView form={form} onSubmit={handleSubmit} />)
}

export default SearchUserLogic;