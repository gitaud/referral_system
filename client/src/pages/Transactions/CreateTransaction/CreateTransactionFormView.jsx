import React from 'react';
import SearchUser from '../../../common-components/search-user/SearchUser';
import styles from "../styles/TransactionForm.module.css";

const CreateTransactionFormView = ({ form, customerData, onSubmit }) => {
	const { formState, register, handleSubmit } = form;
	const { errors, isSubmitting } = formState;

	return (
		<div className={styles.transaction}>
			<div className={styles.transactionContainer}>
				<div className={styles.transactionUpdate}>
					<span className={styles.transactionUpdateTitle}>Create New Transaction</span>
					<div className={styles.transactionUpdateForm}>
						<div className={styles.transactionUpdateLeft}>
							<SearchUser />
							{ customerData &&
								<form onSubmit={handleSubmit(onSubmit)}>
										<div className={styles.transactionUpdateItem}>
											<span className={styles.pItemTitle}>Customer Data</span>
											<span className={styles.pItem}>Name: { customerData.name} </span>
											<span className={styles.pItem}>Phone: { customerData.phone} </span>
										</div>
										<div className={styles.transactionUpdateItem}>
											<label htmlFor="name">Amount</label>
											<input type="number" min={0} id="amount" placeholder="Amount" className={styles.transactionUpdateInput} {...register("amount")} />
											{errors && <div className={styles.error}>{errors?.name?.message}</div>}
										</div>
										<div className={styles.transactionUpdateItem}>
											<button className={styles.transactionUpdateButton} disabled={isSubmitting} type="submit">Create</button>
										</div>
									</form>
							}
						</div>
						<div className={styles.transactionUpdateRight} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default CreateTransactionFormView;