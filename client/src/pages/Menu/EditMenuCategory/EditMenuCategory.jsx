import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import { updateMenuCategoryDetails } from '../../../apiCalls/menuApiCalls';
import EditMenuCategoryLogic from './EditMenuCategoryLogic';

const EditMenuCategory = () => {
	const categoryName = useLocation().state;
	const { user } = useAuthContext();

	const defaultValues = { name: categoryName };

	const handleSubmit = async (categoryId, data) => {
		return updateMenuCategoryDetails(user.authToken, categoryId, data);
	}
	return (<EditMenuCategoryLogic defaultValues={defaultValues} onSubmit={handleSubmit} />)
}

export default EditMenuCategory;