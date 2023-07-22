import React from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { updateMenuCategoryDetails } from '../../../apiCalls/menuApiCalls';
import EditMenuCategoryLogic from './EditMenuCategoryLogic';

const EditMenuCategory = ({ categoryData }) => {
	const { user } = useAuthContext();

	const defaultValues = categoryData;

	const handleSubmit = async (categoryId, data) => {
		return updateMenuCategoryDetails(user.authToken, categoryId, data);
	}
	return (<EditMenuCategoryLogic defaultValues={defaultValues} onSubmit={handleSubmit} />)
}

export default EditMenuCategory;