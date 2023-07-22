import React from 'react';
import { useLocation } from 'react-router';
import { useAuthContext } from '../../../context/AuthContext';
import { updateMenuItem } from '../../../apiCalls/menuApiCalls';
import EditMenuItemLogic from './EditMenuItemLogic';

const EditMenuItem = () => {

	const itemData = useLocation().state;
	
	const { user } = useAuthContext();

	const handleSubmit = async (itemId, data) => {
		return updateMenuItem(user.authToken, itemId, data);
	}
	return (<EditMenuItemLogic defaultValues={itemData} onSubmit={handleSubmit} />)
}

export default EditMenuItem;