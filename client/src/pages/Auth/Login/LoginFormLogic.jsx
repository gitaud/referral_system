import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {
  useAuthContext,
  initiateLogin,
  loginSuccess,
  loginFailure,
} from '../../../context/AuthContext';
import LoginFormView from "./LoginFormView";


const LoginFormSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
});

const LoginFormLogic = ({defaultValues, onSubmit }) => {
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();
  
  const form = useForm({
    mode: "onSubmit",
    defaultValues,
    resolver: yupResolver(LoginFormSchema)
  });

  const handleSubmit = async (data) => {
    try {
      dispatch(initiateLogin());
      const response = await onSubmit(data);
      console.log(response);
      dispatch(loginSuccess(response));
      navigate("/");
    } catch(error) {
      dispatch(loginFailure(error.cause.response.data));
    }
  }
  return <LoginFormView form={form} onSubmit={handleSubmit} error={user.error} />
}

export default LoginFormLogic;