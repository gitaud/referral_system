import React from 'react';
import LoginFormLogic from './LoginFormLogic';
import { loginRequest } from '../../../apiCalls/authApiCalls';
import useSetDocumentTitle from '../../../common-hooks/setDocumentTitle';


const LoginForm = () => {

	useSetDocumentTitle("Login");
	
	const handleSubmit = async (data) => {
		const submitData = {
			email: data.email,
			password: data.password
		};
		return loginRequest(submitData);
	}

	const defaultValues = {
		email: "",
		password: "",
	}

	return(
		<LoginFormLogic defaultValues={defaultValues} onSubmit={handleSubmit} />
	)
}

export default LoginForm