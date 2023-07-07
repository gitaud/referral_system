import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/AuthForms.module.css';

const ResetPassordFormView = ({ form, onSubmit, error }) => {
  const { formState, register, handleSubmit } = form;
  const { errors, isSubmitting } = formState;
  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input className={styles.input }
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors && <p className={styles.error}>{errors?.password?.message} </p>}
        <input className={styles.input}
          type="password"
          placeholder="Repeat password"
          {...register("repeatPassword")}
        />
        {errors && <p className={styles.error}>{errors?.repeatPassword?.message} </p>}
        <button disabled={isSubmitting} className={styles.button} type="submit" >Reset</button>
        {error && <p className={styles.error}>{error} </p>}
        <Link to="/login" className={styles.link}>Forget it! Just log me in</Link>
      </form>
    </div>
  )
}

export default ResetPassordFormView;