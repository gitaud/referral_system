import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {
  useAuthContext,
  loginSuccess,
  loginFailure,
} from '../../../context/AuthContext';
import LoginFormView from "./LoginFormView";


const LoginFormSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
});

const LoginFormLogic = ({defaultValues, onSubmit }) => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  
  const form = useForm({
    mode: "onSubmit",
    defaultValues,
    resolver: yupResolver(LoginFormSchema)
  });

  const handleSubmit = async (data) => {
    try {
      const response = await onSubmit(data);
      dispatch(loginSuccess(response.data));
      navigate("/");
    } catch(error) {
      dispatch(loginFailure(error.data));
    }
  }
  return <LoginFormView form={form} onSubmit={handleSubmit} />
}

export default LoginFormLogic;