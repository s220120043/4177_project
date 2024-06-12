/**
 * reset password
 * 
 * @autho Yuxuan (Hardison) Wang
 */
import React, { useState } from 'react';
import { useFormik } from "formik";
import { resetPasswordSchema } from '../../schemas/schemas.js';
import { useNavigate, useParams } from 'react-router-dom';
import "../../css/credentials.css";

const Reset = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  // submit reset password, go back to login
  const onSubmit = async (values, actions) => {
    try {
      if (values.reset_password !== values.confirm_password) {
        throw new Error('The new password and confirm password fields do not match.');
      }

      const response = await fetch(`/api/user/${id}/updatePassword`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          oldPassword: values.current_password,
          newPassword: values.reset_password
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      navigate("/reset-success");
      actions.resetForm();
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      actions.setSubmitting(false);
    }
  };

  // formik properties
  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      current_password: "",
      reset_password: "",
      confirm_password: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit,
  });

    return (
        <div className="reset-password">

            {/* enter the new password and confirm it */}
            <form onSubmit={handleSubmit} autoComplete="off" className='d-flex justify-content-center align-items-center mb-3'>
                <div className='form-group p-4 p-sm-3 myform'>
                    <h2>Reset Password</h2>
                    <div className='form-group mb-3'>
                        <label htmlFor="reset_password" className='control-label labels'>Enter your new password: </label>
                        <input type="password" value={values.reset_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="recover-email"
                            className={errors.reset_password && touched.reset_password ? "input-error form-control" : "form-control"}
                            name="reset_password" />
                        {errors.reset_password && touched.reset_password && <p className="error">{errors.reset_password}</p>}
                    </div>

                    <div className='form-group mb-3'>
                        <label htmlFor="confirm_password" className='control-label labels'>Confirm password: </label>
                        <input type="password" value={values.confirm_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="confirm_password"
                            className={errors.confirm_password && touched.confirm_password ? "input-error form-control" : "form-control"}
                            name="confirm_password" />
                        {errors.confirm_password && touched.confirm_password && <p className="error">{errors.confirm_password}</p>}
                    </div>

                    <div id='recover-page-button'>
                        <input type="submit" className='btn btn-primary' disabled={isSubmitting} value="Submit" />

                        {/* discard changes */}
                        <input type="button" className='btn btn-danger m-3' onClick={() => {
                            navigate("/login");
                        }} value="Cancel" />
                    </div>
                </div>
            </form>
        </div>
    );
}

// #endregion

export default Reset;