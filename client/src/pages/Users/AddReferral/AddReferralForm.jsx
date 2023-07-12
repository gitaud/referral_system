import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import { UserContextProvider } from '../../../context/UserContext';
import { addReferral, } from '../../../apiCalls/userApiCalls';
import AddReferralFormLogic from './AddReferralFormLogic';
import useSetDocumentTitle from '../../../common-hooks/setDocumentTitle';

const AddReferralForm = ({ usrData}) => {
	const { user } = useAuthContext()
	const usrId = useParams().id
	useSetDocumentTitle(`Add referral - ${usrData.name}`)

	const handleSubmit = (referredId) => {
		return addReferral(user.authToken, usrId, referredId);
	}

	return (
		<UserContextProvider>
			<AddReferralFormLogic onSubmit={handleSubmit} />
		</UserContextProvider>
	)
}

export default AddReferralForm;