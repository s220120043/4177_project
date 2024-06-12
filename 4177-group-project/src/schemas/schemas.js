// all the form validation schemas for yup

import * as yup from 'yup';

// at least 8 char, 1 upper case letter, 1 lower case letter, 1 number and 1 symbol
const pwRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const stringRegex = /^[A-Za-z]*$/;
const emailRegex = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;

// schema of recover email
export const recoverEmailSchema = yup.object().shape({
    recover_email: yup.string()
        .email("Please enter a valid email")
        .matches(emailRegex, {message: "Invalid format! Allows English alphabet, underscore and dot."})
        .required("This field is required"),
});

// schema of reset password
export const resetPasswordSchema = yup.object().shape({
    reset_password: yup.string().min(8)
    .matches(pwRegex, {message: "Must contains at least 8 char, 1 upper case letter, 1 lower case letter, 1 number and 1 symbol (!@#$%^&*)"})
    .required("Password cannot be empty!"),

    confirm_password: yup.string().oneOf([yup.ref('reset_password'), null], "Passwords must match!")
    .required("Please confirm the password here!"),
});

// schema of normal login
export const loginSchema = yup.object().shape({
    username: yup.string().matches(emailRegex, {message: "Invalid Email"})
        .required("This field is required"),

    password: yup.string().min(8)
    .matches(pwRegex, {message: "Invalid password!"})
    .required("Enter your password here!"), 
})

// schema of register
export const registSchema = yup.object().shape({
    firstname: yup.string().matches(stringRegex, {message: "Only letters are allowed!"})
    .required("Username cannot be empty!"),

    lastname: yup.string().matches(stringRegex, {message: "Only letters are allowed!"})
        .required("Username cannot be empty!"),

    email: yup.string()
        .matches(emailRegex, {message: "Invalid format! Allows English alphabet, underscore and dot."})
        .email("Please enter a valid email")
        .required("This field is required"),

    password: yup.string().min(8)
    .matches(pwRegex, {message: "Must contains at least 8 char, 1 upper case letter, 1 lower case letter, 1 number and 1 symbol (!@#$%^&*)"})
    .required("Password cannot be empty!"),

    confirm_password: yup.string().oneOf([yup.ref('password'), null], "Passwords must match!")
    .required("Please confirm the password here!"),
})