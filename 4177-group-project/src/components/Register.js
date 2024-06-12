/**
 * registration page
 * 
 * @author Yuxuan(Hardison) Wang
 */

import React from 'react';
import { useFormik } from 'formik';
import { registSchema } from '../schemas/schemas';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';


const Register = () => {
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    try {
      const response = await axios.post('/api/register', {
        email: values.email,
        password: values.password
      });
      
      console.log('Successfully Registered!', response.data);
      navigate('/index');
    } catch (error) {
      console.error(error);
    }
    actions.resetForm();
  }

  // formik properties
  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: registSchema,
    onSubmit,
  });


    // registration form
    return (
        <div className='d-flex justify-content-center align-items-center'>

            <Form className='p-4 p-sm-3 myform' onSubmit={handleSubmit}>
                <h2>Register</h2>
                <Form.Group className='mb-3' controlId='username'>
                    <Form.Label className='labels'>Firstname: </Form.Label>
                    <Form.Control type="text"
                        value={values.firstname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.firstname && touched.firstname ? "input-error form-control" : "form-control"}
                        name="firstname" placeholder="How can we address you?" />
                    <Form.Text
                        className='text-danger'>{errors.firstname && touched.firstname && errors.firstname}</Form.Text>

                    <Form.Label className='labels'>Lastname: </Form.Label>
                    <Form.Control type="text"
                        value={values.lastname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.lastname && touched.lastname ? "input-error form-control" : "form-control"}
                        name="lastname" placeholder="How can we address you?" />
                    <Form.Text
                        className='text-danger'>{errors.lastname && touched.lastname && errors.lastname}</Form.Text>
                </Form.Group>

                <Form.Group className='mb-3' controlId='email'>
                    <Form.Label className='labels'>Email: </Form.Label>
                    <Form.Control type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.email && touched.email ? "input-error form-control" : "form-control"}
                        name="email" placeholder="captain@group20.com" />
                    <Form.Text className='text-danger'>{errors.email && touched.email && errors.email}</Form.Text>
                </Form.Group>

                <Form.Group className='mb-3' controlId='password'>
                    <Form.Label className='labels'>Password: </Form.Label>
                    <Form.Control type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.password && touched.password ? "input-error form-control" : "form-control"}
                        name="password" placeholder="Password" />
                    <Form.Text
                        className='text-danger'>{errors.password && touched.password && errors.password} </Form.Text>
                </Form.Group>

                <Form.Group className='mb-3' controlId='password'>
                    <Form.Label className='labels'>Confirm Password: </Form.Label>
                    <Form.Control type="password"
                        value={values.confirm_password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.confirm_password && touched.confirm_password ? "input-error form-control" : "form-control"}
                        name="confirm_password" placeholder="Enter the password again!" />
                    <Form.Text
                        className='text-danger'>{errors.confirm_password && touched.confirm_password && errors.confirm_password}</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" id="recover-page-button">
                    <Button className='m-3' variant="primary" type="submit" disabled={isSubmitting}>
                        Submit
                    </Button>

                    <Button className='m-3' variant="danger" type="button" onClick={() => {
                        navigate("/login");
                    }} disabled={isSubmitting}>
                        Cancel
                    </Button>
                </Form.Group>
            </Form>

        </div>
    );
};

export default Register;
