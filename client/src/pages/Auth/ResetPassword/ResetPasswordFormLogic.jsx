import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ResetPasswordFormView from './ResetPasswordFormView'

const ResetPassswordFormSchema = yup.object().shape({
	password: yup.string().required(),
	repeatPassword: yup.string().required()
})

const ResetPasswordFormLogic = ({ defaultValues, onSubmit }) => {
	const navigate = useNavigate();
	const [ error, setError ] = useState(null);

	const form = useForm({
		mode: "onSubmit",
		defaultValues,
		resolver: yupResolver(ResetPassswordFormSchema)
	});

	const handleSubmit = async (data) => {
		try {
			if (data.password !== data.repeatPassword) {
				throw new Error("Passwords do not match", { cause: "Passwords do not match"})
			}
			await onSubmit(data);
			navigate("/login");
		} catch(error) {
			if (error.cause === "Passwords do not match" ) {
				setError(error.cause);
			} else {
				setError(error.cause.response.data);
			}
		}
	}

	return(<ResetPasswordFormView form={form} onSubmit={handleSubmit} error={error} />)
}

export default ResetPasswordFormLogic;