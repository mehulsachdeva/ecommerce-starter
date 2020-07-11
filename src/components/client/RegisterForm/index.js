import React, { Component } from 'react';
import { Formik } from 'formik';
import ApiService from '../../../utilities/ApiService';
import { REGISTER_USER, CHECK_EMAIL_ALREADY_REGISTERED } from '../../../common/constants/urls';

const initialValues = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
}

const validation = (values) => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid Email Address';
    } 
    if (!values.firstName) {
        errors.firstName = 'Required';
    } 
    if (!values.lastName) {
        errors.lastName = 'Required';
    } 
    if (!values.password) {
        errors.password = 'Required';
    } 
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Required';
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Confirm Password Doesn\'t Matches With The Password';
    }
    return errors;
}

class RegisterForm extends Component {

    state = {
        emailExists: false
    }

    handleSubmit = (values, { setSubmitting }) => {
        const { emailExists } = this.state;
        if(!emailExists) {
            this.registerUser(values);
        }
        setSubmitting(false);
    }

    checkEmailAlreadyRegistered = async (values) => {
        try {
            const response = await ApiService.get(`${CHECK_EMAIL_ALREADY_REGISTERED}/${values.email}`);
            this.setState({
                ...this.state,
                emailExists: false
            })
        }catch(err) {
            this.setState({
                ...this.state,
                emailExists: true
            })
            console.log(err);
        }
    }

    registerUser = async (values) => {
        try {
            const response = await ApiService.post(REGISTER_USER, values);
        }catch(err) {
            console.log(err);
        }
    }

    render() {

        const { emailExists } = this.state;

        return (
            <Formik
                initialValues={initialValues}
                validate={validation}
                onSubmit={this.handleSubmit}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div>
                                <input
                                    type = "email"
                                    name = "email"
                                    placeholder = "Email"
                                    onChange = {handleChange}
                                    onBlur = {(e) => {
                                        handleBlur(e);
                                        this.checkEmailAlreadyRegistered(values, isSubmitting);
                                    }}
                                    value = {values.email}
                                />
                            </div>
                            <div>
                                {
                                    (errors.email && touched.email && errors.email) || 
                                    (emailExists && "Email Already Exists")
                                }
                            </div>
                        </div>
                        <div>
                            <div>
                                <input
                                    type = "text"
                                    name = "firstName"
                                    placeholder = "First Name"
                                    onChange = {handleChange}
                                    onBlur = {handleBlur}
                                    value = {values.firstName}
                                />
                            </div>
                            <div>
                                {errors.firstName && touched.firstName && errors.firstName}
                            </div>
                        </div>
                        <div>
                            <div>
                                <input
                                    type = "text"
                                    name = "lastName"
                                    placeholder = "Last Name"
                                    onChange = {handleChange}
                                    onBlur = {handleBlur}
                                    value = {values.lastName}
                                />
                            </div>
                            <div>
                                {errors.lastName && touched.lastName && errors.lastName}
                            </div>
                        </div>
                        <div>
                            <div>
                                <input
                                    type = "password"
                                    name = "password"
                                    placeholder = "Password"
                                    onChange = {handleChange}
                                    onBlur = {handleBlur}
                                    value = {values.password}
                                />
                            </div>
                            <div>
                                {errors.password && touched.password && errors.password}
                            </div>
                        </div>
                        <div>
                            <div>
                                <input
                                    type = "password"
                                    name = "confirmPassword"
                                    placeholder = "Confirm Password"
                                    onChange = {handleChange}
                                    onBlur = {handleBlur}
                                    value = {values.confirmPassword}
                                />
                            </div>
                            <div>
                                {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                            </div>
                        </div>
                        <div>
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        );
    }
}

export default RegisterForm;