import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AuthForms.css';

const ResetPassordFormView = ({ form, onSubmit, error }) => {
  const { formState, register, handleSubmit } = form;
  const { errors, isSubmitting } = formState;
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors && <p className="error">{errors?.password?.message} </p>}
        <input
          type="password"
          placeholder="Repeat password"
          {...register("repeatPassword")}
        />
        {errors && <p className="error">{errors?.repeatPassword?.message} </p>}
        <button disabled={isSubmitting} type="submit" >Reset</button>
        {error && <p className="error">{error} </p>}
        <Link to="/login" className="link">Forget it! Just log me in</Link>
      </form>
    </div>
  )
}

export default ResetPassordFormView;