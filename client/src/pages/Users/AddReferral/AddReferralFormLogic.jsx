import React from 'react';
import Swal from 'sweetalert2';
import { useUserContext } from '../../../context/UserContext';
import AddReferralFormView from './AddReferralFormView';

const AddReferralFormLogic = ({ onSubmit }) => {
	const { searchedUser } = useUserContext();
	

	const handleSubmit = async () => {
		const referralId = searchedUser?.user?._id;
		try {
			Swal.fire({
				title: 'Saving',
				timer: 2000,
				didOpen: () => Swal.showLoading(),
			})
			await onSubmit({referralId});
			setTimeout(() => {
				Swal.fire({
					icon: 'success',
					title: 'Referral saved',
					showConfirmButton: true,
					timer: 2000
				})
			}, 1500);
			window.location.reload();
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Oops',
				text: `${error.cause?.response?.data || 'Error! Failed to add referral'}`,
				showConfirmButton: true
			});
		}
	}
	return (<AddReferralFormView searchedUser={searchedUser.user} onSubmit={handleSubmit} />)
}

export default AddReferralFormLogic;
