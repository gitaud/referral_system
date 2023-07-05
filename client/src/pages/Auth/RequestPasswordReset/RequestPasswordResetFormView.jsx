import React from 'react';
import "./RequestPasswordResetForm.css";

export default function RequestPasswordResetFormView({ form, onSubmit, success }) {
  const { formState, register, handleSubmit } = form;
  const { errors, isSubmitting } = formState;
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Enter your email below: </label>
        <input
          type="text"
          placeholder="user@gmail.com"
          {...register("email")}
        />
        {errors && <p className="error">{errors?.email?.message} </p>}
        <button disabled={isSubmitting} type="submit" >Request</button>
        { success === true && <p className="success">Successful! Check email for the link</p>}
        { success === false && <p className="error">Error! Unable to reset </p>}
      </form>
    </div>
  )
}