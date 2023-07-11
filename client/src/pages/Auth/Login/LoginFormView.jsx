import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/AuthForms.module.css';

const LoginFormView = ({ form, onSubmit, error }) => {
	const { formState, register, handleSubmit } = form;
	const { errors, isSubmitting } = formState;
	return(
		<div>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<input className={styles.input}
					type="text" 
					placeholder="user@gmail.com"
					{ ...register("email") }
				/>
				{errors && <p className={styles.error}>{errors?.email?.message} </p>}
				<input className={styles.input}
					type="password" 
					placeholder="password"
					{ ...register("password") }
					/>
				{errors && <p className={styles.error}>{errors?.password?.message} </p>}
				<button disabled={isSubmitting} className={styles.button} type="submit" >Login</button>
				{ error && <p className={styles.error}>{error} </p>}
				<Link to="/reset/password" className={styles.link}>Reset Password</Link>
			</form>
		</div>
	)
}

export default LoginFormView;