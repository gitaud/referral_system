import React from 'react';
import styles from "../styles/UserForm.module.css";

const CreateUserFormView = ( { form, onSubmit } ) => {
	const { formState, register, handleSubmit } = form;
	const { errors, isSubmitting } = formState;

	return (
		<div className={styles.user}>
			<div className={styles.userContainer}>
				<div className={styles.userUpdate}>
					<span className={styles.userUpdateTitle}>Create New User</span>
					<form className={styles.userUpdateForm} onSubmit={handleSubmit(onSubmit)}>
						<div className={styles.userUpdateLeft}>
							<div className={styles.userUpdateItem}>
								<label htmlFor="name">Name</label>
								<input type="text" id="name" placeholder="Name" className={styles.userUpdateInput} {...register("name")} />
								{errors && <div className={styles.error}>{errors?.name?.message}</div>}
							</div>
							<div className={styles.userUpdateItem}>
								<label htmlFor="email">Email</label>
								<input id="email" type="email" {...register("email")} placeholder="example@email.com" className={styles.userUpdateInput} />
								{errors && <div className={styles.error}>{errors?.email?.message}</div>}
							</div>
							<div className={styles.userUpdateItem}>
								<label htmlFor="phone">Phone</label>
								<input id="phone" type="text" {...register("phone")} placeholder="0711 223 344" className={styles.userUpdateInput} />
								{errors && <div className={styles.error}>{errors?.phone?.message}</div>}
							</div>
							<div className={styles.userUpdateItem}>
								<label htmlFor="password">Phone</label>
								<input id="password" type="text" {...register("password")} placeholder="Strong password" className={styles.userUpdateInput} />
								{errors && <div className={styles.error}>{errors?.password?.message}</div>}
							</div>
							<div className={styles.userUpdateItem}>
								<label htmlFor="admin">Is Admin </label>
								<select name="admin" id="admin" defaultValue={false} className={styles.userUpdateInput} {...register("isAdmin")}>
									<option value={true}>Yes</option>
									<option value={false}>No</option>
								</select>
								{errors && <div className={styles.error}>{errors?.isAdmin?.message}</div>}
							</div>
						</div>
						<div className={styles.userUpdateRight}>
							<button className={styles.userUpdateButton} disabled={isSubmitting} type="submit">Create</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default CreateUserFormView;