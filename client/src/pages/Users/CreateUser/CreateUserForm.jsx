import React from 'react';
import useSetDocumentTitle from '../../../common-hooks/setDocumentTitle';
import { useAuthContext } from '../../../context/AuthContext';
import { createUser } from '../../../apiCalls/userApiCalls';
import CreateUserFormLogic from './CreateUserFormLogic';

const CreateUserForm = () => {
	useSetDocumentTitle("Create New User");
	const { user } = useAuthContext();

	const handleSubmit = async (data) => {
		return createUser(user.authToken, data);
	}

	const defaultValues = {
		name: "",
		email: "",
		phone: "",
		password: "",
		isAdmin: false,
	}

	
	return (<CreateUserFormLogic defaultValues={defaultValues} user={user} onSubmit={handleSubmit} />)
}

export default CreateUserForm;