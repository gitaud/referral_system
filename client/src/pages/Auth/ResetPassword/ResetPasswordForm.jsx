import React from 'react';
import { useParams } from 'react-router';
import { resetPassword } from '../../../apiCalls/authApiCalls';
import ResetPasswordFormLogic from './ResetPasswordFormLogic';
import useSetDocumentTitle from '../../../common-hooks/setDocumentTitle';

const ResetPasswordForm = () => {
	useSetDocumentTitle("Reset Password");
	const token = useParams().token;

	const handleSubmit = async (data) => {
		const submitData = {
			password: data.password
		}
		return resetPassword(token, submitData)
	}

	const defaultValues = {
		password: "",
		repeatPassword: ""
	}

	return(<ResetPasswordFormLogic defaultValues={defaultValues} onSubmit={handleSubmit} />)
}

export default ResetPasswordForm;