import React from 'react';
import styles from "../styles/MenuForm.module.css";

export default function EditMenuItemView({ form, onSubmit }) {
	const { formState, register, handleSubmit } = form;
	const { errors, isSubmitting } = formState;


	return (
		<div className={styles.menuForm}>
			<div className={styles.menuFormContainer}>
				<div className={styles.menuFormUpdate}>
					<span className={styles.menuFormUpdateTitle}>Edit Menu Item</span>
					<form className={styles.menuFormUpdateForm} onSubmit={handleSubmit(onSubmit)}>
						<div className={styles.menuFormUpdateLeft}>
							<div className={styles.menuFormUpdateItem}>
								<label htmlFor="name">Name</label>
								<input type="text" id="name" placeholder="Name" className={styles.menuFormUpdateInput} {...register("name")} />
								{errors && <div className={styles.menuForm}>{errors?.name?.message}</div>}
							</div>
							<div className={styles.menuFormUpdateItem}>
								<label htmlFor="price">Price</label>
								<input type="number" min={0} id="price" placeholder="Price" className={styles.menuFormUpdateInput} {...register("price")} />
								{errors && <div className={styles.menuForm}>{errors?.price?.message}</div>}
							</div>
							<div className={styles.menuFormUpdateItem}>
								<button className={styles.menuFormUpdateButton} disabled={isSubmitting} type="submit">Update</button>
							</div>
						</div>
						<div className={styles.menuFormUpdateRight} />
					</form>
				</div>
			</div>
		</div>
	);
}
