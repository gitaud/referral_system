import React from 'react';
import RequestPasswordResetFormLogic from './RequestPasswordResetFormLogic';
import { requestPasswordReset } from '../../../apiCalls/authApiCalls';
import useSetDocumentTitle from '../../../common-hooks/setDocumentTitle';

const RequestPasswordResetForm = () => {
  useSetDocumentTitle("Request Password Reset");

  const handleSubmit = async (data) => {
    const submitData = {
      email: data.email
    }
    return requestPasswordReset(submitData);
  }

  const defaultValues = {
    email: ""
  }

  return (<RequestPasswordResetFormLogic defaultValues={defaultValues} onSubmit={handleSubmit} />)
}

export default RequestPasswordResetForm;