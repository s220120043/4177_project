/**
 * credentials recovery
 * @descp request users to enter the email associated to the account,
 *  validates user input using formik, on click the submit button check the email in DB,
 *  if a match exists, display the firstname. go back to the login page on click cancel button
 * 
 * @author Yuxuan(Hardison) Wang
 */

import React from "react";
import { useFormik } from 'formik';
import { recoverEmailSchema } from "../../schemas/schemas.js";
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import "../../css/credentials.css";


export const Recover = () => {
    const navigate = useNavigate();
    const onSubmit = async (values, actions) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/message");
        actions.resetForm();
    };
    const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            recover_email: "",
        },
        validationSchema: recoverEmailSchema,
        onSubmit,
    });



    return (
        <div className="d-flex justify-content-center align-items-center">

            <Form className='p-4 p-sm-3 myform' onSubmit={handleSubmit} autoComplete="off">
                <h2>Credentials Recovery</h2>

                <Form.Group className='mb-3' controlId='email'>
                    <Form.Label className='labels'>Enter the email address you have in your profile:</Form.Label>
                    <Form.Control type="email"
                        value={values.recover_email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.recover_email && touched.recover_email ? "input-error form-control" : "form-control"}
                        name="recover_email" placeholder="captain@group20.com" />
                    <Form.Text className='text-danger'>{errors.recover_email && touched.recover_email && errors.recover_email}</Form.Text>
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
}