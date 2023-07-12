import React from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { updateUser } from '../../../apiCalls/userApiCalls';
import EditUserFormLogic from './EditUserFormLogic';

const EditUserForm = ({ usrData }) => {
	const { user } = useAuthContext();

	const defaultValues = usrData;

	const handleSubmit = async (data) => {
		return updateUser(user.authToken, usrData._id, data);
	}
	return (<EditUserFormLogic id={usrData._id} defaultValues={defaultValues} onSubmit={handleSubmit}/>)
}

export default EditUserForm;