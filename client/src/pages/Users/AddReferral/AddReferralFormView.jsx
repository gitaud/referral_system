import React from 'react';
import SearchUser from '../../../common-components/search-user/SearchUser'
import styles from '../styles/UserForm.module.css';

const AddReferralFormView = ({ searchedUser, onSubmit }) => {
	return (
		<div className={styles.userUpdate}>
			<span className={styles.userUpdateTitle}>Add Referral </span>
			<div className={styles.userUpdateForm} >
				<div className={styles.userUpdateLeft}>
					<div className={styles.userUpdateItem}>
						<SearchUser />
					</div>
					<div className={styles.userUpdateItem}>
						{ searchedUser &&  (
							<>
							<p className={styles.pItem}>User found</p>
							<p className={styles.pItem}>Name: {searchedUser.name}</p>
							<p className={styles.pItem}>Email: { searchedUser.email} </p>
							<p className={styles.pItem}>Phone: { searchedUser.phone} </p>
							</>
						)}
					</div>
					<div className={styles.userUpdateItem}>
						{ searchedUser && <button className={styles.userUpdateButton} disabled={!searchedUser} type="submit" onClick={() => onSubmit()}>Add Referral</button>}
					</div>
				</div>
			</div>
		</div>
	)
}

export default AddReferralFormView;