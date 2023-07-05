import React from 'react';
import './LoginForm.css';

const LoginFormView = ({ form, onSubmit }) => {
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
				{errors && <p>{errors?.email?.message} </p>}
				<input 
					type="password" 
					placeholder="password"
					{ ...register("password") }
					/>
				{errors && <p>{errors?.password?.message} </p>}
				<button disabled={ isSubmitting } type="submit" >Login</button>
			</form>
		</div>
	)
}

export default LoginFormView;