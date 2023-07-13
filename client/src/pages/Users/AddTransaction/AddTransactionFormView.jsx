import React from 'react';
import styles from "../styles/UserForm.module.css";

export default function AddTransactionFormView({ form, onSubmit, error, user }) {
	const { formState, register, handleSubmit } = form;
	const { errors, isSubmitting } = formState;

	return (user &&
		<div className={styles.userUpdate}>
			<span className={styles.userUpdateTitle}>Add Transaction</span>
			<form className={styles.userUpdateForm} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.userUpdateLeft}>
					<div className={styles.userUpdateItem}>
						<span className={styles.pItem}>Create new transaction for user { user.name }</span>
					</div>
					<div className={styles.userUpdateItem}>
						<label htmlFor="amount">Amount</label>
						<input type="number" min={0} id="amount" className={styles.userUpdateInput} {...register("amount")} />
						{errors && <div className={styles.error}>{errors?.amount?.message}</div>}
					</div>
					<div className={styles.userUpdateItem}>
						<button className={styles.userUpdateButton} disabled={isSubmitting} type="submit">Add Transaction</button>
						{error && <div className={styles.error}>Error! {error.data} </div>}
					</div>
				</div>
			</form>
		</div>
	);
}
