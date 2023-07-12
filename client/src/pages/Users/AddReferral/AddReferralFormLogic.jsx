import React from 'react';
import Swal from 'sweetalert2';
import { useUserContext } from '../../../context/UserContext';
import AddReferralFormView from './AddReferralFormView';

const AddReferralFormLogic = ({ onSubmit }) => {
	const { user } = useUserContext();
	

	const handleSubmit = async () => {
		const referralId = user?.user?._id;
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
				}).then(result => {
					if (result.isConfirmed) {
						window.location.reload();
					}
				})
			}, 1500);
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Oops',
				text: `${error.cause?.response?.data || 'Error! Failed to add referral'}`,
				showConfirmButton: true
			});
		}
	}
	return (<AddReferralFormView searchedUser={user.user} onSubmit={handleSubmit} />)
}

export default AddReferralFormLogic;
