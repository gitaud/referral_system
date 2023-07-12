import React, { useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getAllLevels } from '../../../apiCalls/levelApiCalls';
import CreateUserFormView from './CreateUserFormView';
import Swal from 'sweetalert2';

const CreateUserFormSchema = yup.object().shape({
	name: yup.string().required(),
	email: yup.string().email().required(),
	phone: yup.string().required(),
	isAdmin: yup.boolean().required(),
	level: yup.string(),
	password: yup.string().required(),
});

const CreateUserFormLogic = ({ defaultValues, user, onSubmit }) => {
	const [firstLevel, setFirstLevel] = useState();
	const navigate = useNavigate();

	const form = useForm({
		mode: "onSubmit",
		defaultValues,
		resolver: yupResolver(CreateUserFormSchema)
	});

	useLayoutEffect(() => {
		const getLevels = async () => {
			const res = await getAllLevels(user.authToken);
			let level = res.filter(level => level.rank === 0)[0];
			setFirstLevel(level._id);
		}
		getLevels();
	});

	const handleSubmit = async (data) => {
		const userData = {
			name: data.name,
			email: data.email,
			phone: data.phone,
			password: data.password,
			level: firstLevel,
		}
		try {
			Swal.fire({
				title: 'Saving',
				timer: 2000,
				didOpen: () => Swal.showLoading(),
			})
			const newUser = await onSubmit(userData);
			setTimeout(() => {
				Swal.fire({
					icon: 'success',
					title: 'User info saved',
					showConfirmButton: true,
					timer: 2000
				}).then(result => {
					if (result.isConfirmed) {
						navigate(`/user/${newUser._id}`);
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

	return (<CreateUserFormView form={form} onSubmit={handleSubmit} />)
}

export default CreateUserFormLogic;