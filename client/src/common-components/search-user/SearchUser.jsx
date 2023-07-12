import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { searchUser } from '../../apiCalls/userApiCalls';
import SearchUserLogic from './SearchUserLogic';

const SearchUser = () => {
	
	const { user } = useAuthContext();

	const defaultValues = {
		query: "",
		param: "email",
	}

	const handleSubmit = (searchParam) => {
		return searchUser(user.authToken, searchParam);
	}
	return(<SearchUserLogic defaultValues={defaultValues} onSubmit={handleSubmit} />)
}

export default SearchUser;