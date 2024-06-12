/**
 * The Login page
 * 
 * @author Yuxuan(Hardison) Wang
 * 
 */
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from '../schemas/schemas.js';
import { useFormik } from 'formik';
import { FormLabel } from 'react-bootstrap';
import axios from "axios";
import "../css/credentials.css";


// login form component
export default function Login() {
    const navigate = useNavigate();
    // submit reset password, go back to login
    const onSubmit = async (values, actions) => {
        try {
            const response = await axios.post('/api/login', {
              email: values.username,
              password: values.password,
            });

            localStorage.setItem('token', response.data.token);

            navigate('/');
        } catch (error) {
            actions.setSubmitting(false);
            actions.setErrors({ username: 'Invalid email or password', password: 'Invalid email or password' });
        }
    };

    // formik properties
    const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit,
    });

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

    return (
        <div className='login-form'>
            {/* fill in credentials and login validation */}
            <form onSubmit={handleSubmit} autoComplete="off" className='d-flex justify-content-center align-items-center mb-3'>
                <div className='form-group p-4 p-sm-3 myform'>
                    <h2>Login</h2>
                    <div className='form-group mb-3'>
                        <label htmlFor="username" className='control-label labels col-sm-3'>Username: </label>
                        <input type="text"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.username && touched.username ? "input-error form-control" : "form-control"}
                            id="username" name="username" autoFocus />
                        {errors.username && touched.username && <p className="error">{errors.username}</p>}
                    </div>

                    <div className='form-group mb3'>
                        <label htmlFor="password" className='control-label labels col-sm-3' >Password: </label>
                        <input type="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.password && touched.password ? "input-error form-control" : "form-control"}
                            id="password" name="password" />
                        {errors.password && touched.password && <p className="error">{errors.password}</p>}
                    </div>

                    <input id="login-button" type="submit" className="btn btn-primary" value="Login" disabled={isSubmitting} />
                </div>
            </form>
            <div style={{textAlign: "center"}}>
                <Link to="/recover">Forget username or password? Click here to recover!</Link><br />
                <Link to="/register">No account yet? Register Now!</Link>
            </div>
        </div>
    );
}