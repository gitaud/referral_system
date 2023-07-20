import React from 'react';
import useSetDocumentTitle from '../../../common-hooks/setDocumentTitle';
import { useAuthContext } from '../../../context/AuthContext';
import CreateMenuCategoryLogic from './CreateMenuCategoryLogic';
import { createNewCategory } from '../../../apiCalls/menuApiCalls';

const CreateMenuCategory = () => {
	useSetDocumentTitle("Create New Category");
	const { user } = useAuthContext();

	const handleSubmit = async (data) => {
		return createNewCategory(user.authToken, data);
	}

	const defaultValues = {
		name: "",
	}


	return (<CreateMenuCategoryLogic defaultValues={defaultValues} onSubmit={handleSubmit} />)
}

export default CreateMenuCategory;