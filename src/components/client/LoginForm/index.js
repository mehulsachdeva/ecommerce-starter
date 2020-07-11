import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import ApiService from '../../../utilities/ApiService';
import { LOGIN_USER } from '../../../common/constants/urls';

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
    if (!values.password) {
        errors.password = 'Required';
    } 
    return errors;
}

class LoginForm extends Component {

    handleSubmit = (values, { setSubmitting }) => {
        this.loginUser(values);
        setSubmitting(false);
    }

    loginUser = async (values) => {
        try {
            const response = await ApiService.post(LOGIN_USER, values);
            const { userId, email, token } = JSON.parse(response.RESPONSE);
            const userLoggedIn = { userId, email, token };
            localStorage.setItem("userLoggedIn", JSON.stringify(userLoggedIn));
            this.props.history.push("/dashboard");
        }catch(err) {
            console.log(err);
        }
    }

    render() {
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
                                    onBlur = {handleBlur}
                                    value = {values.email}
                                />
                            </div>
                            <div>
                                {errors.email && touched.email && errors.email}
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

export default withRouter(LoginForm);