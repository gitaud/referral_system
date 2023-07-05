import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import RequestPasswordResetFormView from "./RequestPasswordResetFormView";

const RequestPasswordResetFormSchema = yup.object().shape({
  email: yup.string().email().required()
});

const RequestPasswordResetFormLogic = ({ defaultValues, onSubmit }) => {
  const [ success, setSuccess ] = useState(null);

  const form = useForm({
    mode: "onSubmit",
    defaultValues,
    resolver: yupResolver(RequestPasswordResetFormSchema)
  });

  const handleSubmit = async (data) => {
    try {
      await onSubmit(data);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
    }
  }
  return <RequestPasswordResetFormView form={form} success={success} onSubmit={handleSubmit} />
}

export default RequestPasswordResetFormLogic;