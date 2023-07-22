import React from 'react';
import useSetDocumentTitle from '../../../common-hooks/setDocumentTitle';
import { useAuthContext } from '../../../context/AuthContext';
import { createNewMenuItem } from '../../../apiCalls/menuApiCalls';
import CreateMenuItemLogic from './CreateMenuItemLogic';

const CreateMenuCategory = () => {
	useSetDocumentTitle("Create New Menu Item");
	const { user } = useAuthContext();

	const handleSubmit = async (categoryId, data) => {
		return createNewMenuItem(user.authToken, categoryId, data);
	}

	const defaultValues = {
		name: "",
		price: 0,
	}


	return (<CreateMenuItemLogic defaultValues={defaultValues} onSubmit={handleSubmit} />)
}

export default CreateMenuCategory;