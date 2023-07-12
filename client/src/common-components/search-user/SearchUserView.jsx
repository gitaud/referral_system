import React from 'react';
import styles from './SearchUser.module.css';

const SearchUserView = ({ form, onSubmit }) => {

	const { formState, register, handleSubmit } = form;
	const { errors, isSubmitting } = formState;

	return(
		<div className={styles.container}>
			<span className={styles.title}>Search User</span>
			<form className={styles.referralForm} onSubmit={handleSubmit(onSubmit)}>
				<input className={ styles.formInput } name="query" {...register("query")} placeholder="Search"/>
				{errors && <p className={styles.error}>{errors?.query?.message} </p>}
				<label htmlFor="param" className={styles.inputLabel}>Search by</label>
				<select className={styles.formInput} id="param" {...register("param")} name="param" defaultValue="email">
					<option value="name">Name</option>
					<option value="email">Email</option>
					<option value="phone">Phone</option>
				</select>
				{ errors && <p className={styles.error}>{errors?.param?.message } </p>}
				<button className={styles.submitButton} type="submit" disabled={isSubmitting}>Search</button>
			</form>
		</div>
	)
}

export default SearchUserView;