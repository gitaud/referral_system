import React from 'react';
import styles from "../styles/MenuForm.module.css";

const CreateMenuCategoryView = ({ form, onSubmit }) => {
	const { formState, register, handleSubmit } = form;
	const { errors, isSubmitting } = formState;

	return (
		<div className={styles.menuForm}>
			<div className={styles.menuFormContainer}>
				<div className={styles.menuFormUpdate}>
					<span className={styles.menuFormUpdateTitle}>Create New User</span>
					<form className={styles.menuFormUpdateForm} onSubmit={handleSubmit(onSubmit)}>
						<div className={styles.menuFormUpdateLeft}>
							<div className={styles.menuFormUpdateItem}>
								<label htmlFor="name">Name</label>
								<input type="text" id="name" placeholder="Name" className={styles.menuFormUpdateInput} {...register("name")} />
								{errors && <div className={styles.menuForm}>{errors?.name?.message}</div>}
							</div>
							<div className={styles.menuFormUpdateItem}>

								<button className={styles.menuFormUpdateButton} disabled={isSubmitting} type="submit">Create</button>
							</div>
						</div>
						<div className={styles.menuFormUpdateRight}>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default CreateMenuCategoryView;