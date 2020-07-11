import React, { Component } from 'react';
import { Formik } from 'formik';
import ApiService from '../../../utilities/ApiService';
import { UPDATE_SHIPPING_DETAILS, FETCH_SHIPPING_DETAILS } from '../../../common/constants/urls';

const validation = (values) => {
    const errors = {};
    if (!values.addressLine1) {
        errors.email = 'Required';
    } 
    if (!values.postalCode) {
        errors.password = 'Required';
    } 
    if (!values.city) {
        errors.password = 'Required';
    }
    if (!values.country) {
        errors.password = 'Required';
    }
    return errors;
}


class ShippingForm extends Component {
    
    state = {
        initialValues: {
            addressLine1: '',
            addressLine2: '',
            postalCode: '',
            city: '',
            country: ''
        }
    }

    componentWillMount = () => {
        this.fetchShippingDetails();
    }

    handleSubmit = (values, { setSubmitting }) => {
        this.updateShippingDetails(values);
        setSubmitting(false);
    }

    updateShippingDetails = async (values) => {
        const { token, userId } = this.props;
        try {
            const response = await ApiService.postWithAuthorization(UPDATE_SHIPPING_DETAILS, { userId, ...values }, token);
            console.log(response);
        }catch(err){
            console.log(err);
        }
    }

    fetchShippingDetails = async () => {
        const { token, userId } = this.props;
        try {
            const response = await ApiService.getWithAuthorization(`${FETCH_SHIPPING_DETAILS}/${userId}`, token);
            const values = JSON.parse(response.RESPONSE);
            this.setState({
                ...this.state,
                initialValues: {
                    addressLine1: values.addressLine1,
                    addressLine2: values.addressLine2,
                    postalCode: values.postalCode,
                    city: values.city,
                    country: values.country
                }
            })
        }catch(err) {
            console.log(err);
        }
    }

    render() {

        const { initialValues } = this.state;
        
        return (
            <Formik
                enableReinitialize
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
                                    type = "text"
                                    name = "addressLine1"
                                    placeholder = "Address Line 1"
                                    onChange = {handleChange}
                                    onBlur = {handleBlur}
                                    value = {values.addressLine1}
                                />
                            </div>
                            <div>
                                {errors.addressLine1 && touched.addressLine1 && errors.addressLine1}
                            </div>
                        </div>
                        <div>
                            <div>
                                <input
                                    type = "text"
                                    name = "addressLine2"
                                    placeholder = "Address Line 2"
                                    onChange = {handleChange}
                                    onBlur = {handleBlur}
                                    value = {values.addressLine2}
                                />
                            </div>
                            <div>
                                {errors.addressLine2 && touched.addressLine2 && errors.addressLine2}
                            </div>
                        </div>
                        <div>
                            <div>
                                <input
                                    type = "text"
                                    name = "postalCode"
                                    placeholder = "Postal Code"
                                    onChange = {handleChange}
                                    onBlur = {handleBlur}
                                    value = {values.postalCode}
                                />
                            </div>
                            <div>
                                {errors.postalCode && touched.postalCode && errors.postalCode}
                            </div>
                        </div>
                        <div>
                            <div>
                                <input
                                    type = "text"
                                    name = "city"
                                    placeholder = "City"
                                    onChange = {handleChange}
                                    onBlur = {handleBlur}
                                    value = {values.city}
                                />
                            </div>
                            <div>
                                {errors.city && touched.city && errors.city}
                            </div>
                        </div>
                        <div>
                            <div>
                                <input
                                    type = "text"
                                    name = "country"
                                    placeholder = "Country"
                                    onChange = {handleChange}
                                    onBlur = {handleBlur}
                                    value = {values.country}
                                />
                            </div>
                            <div>
                                {errors.country && touched.country && errors.country}
                            </div>
                        </div>
                        <div>
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                            >
                                Update
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        );
    }
}

export default ShippingForm;