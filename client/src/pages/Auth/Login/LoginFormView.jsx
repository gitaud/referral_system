import React from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.css';

const LoginFormView = ({ form, onSubmit, error }) => {
	const { formState, register, handleSubmit } = form;
	const { errors, isSubmitting } = formState;
	return(
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input 
					type="text" 
					placeholder="admin@gmail.com"
					{ ...register("email") }
				/>
				{errors && <p className="error">{errors?.email?.message} </p>}
				<input 
					type="password" 
					placeholder="password"
					{ ...register("password") }
					/>
				{errors && <p className="error">{errors?.password?.message} </p>}
				<button disabled={ isSubmitting } type="submit" >Login</button>
				{ error && <p className="error">{error} </p>}
				<Link to="/reset/password" className="link">Reset Password</Link>
			</form>
		</div>
	)
}

export default LoginFormView;