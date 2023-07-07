import React from 'react';
import styles from '../styles/AuthForms.module.css';

export default function RequestPasswordResetFormView({ form, onSubmit, success }) {
  const { formState, register, handleSubmit } = form;
  const { errors, isSubmitting } = formState;
  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.label}>Enter your email below: </label>
        <input className={styles.input}
          type="text"
          placeholder="user@gmail.com"
          {...register("email")}
        />
        {errors && <p className={styles.error}>{errors?.email?.message} </p>}
        <button disabled={isSubmitting} className={styles.button} type="submit" >Request</button>
        { success === true && <p className={styles.success}>Successful! Check email for the link</p>}
        { success === false && <p className={styles.error}>Error! Unable to reset </p>}
      </form>
    </div>
  )
}