import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import ApiService from '../../../utilities/ApiService';
import { UPDATE_SHIPPING_DETAILS, FETCH_SHIPPING_DETAILS } from '../../../common/constants/urls';
import { updateShippingDetails } from '../../../common/actions';

const initialValues = {
    addressLine1: '',
    addressLine2: '',
    postalCode: '',
    city: '',
    country: ''
}

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
    
    handleSubmit = (values, { setSubmitting }) => {
        this.updateShippingDetails(values);
        setSubmitting(false);
    }

    updateShippingDetails = async (values) => {
        const { token, userId } = this.props;
        if(!token || !userId) {
            this.props.updateShippingDetails(values);
        }else {
            const obj = {
                userId,
                ...values
            }
            try {
                const response = await ApiService.postWithAuthorization(UPDATE_SHIPPING_DETAILS, obj, token);
                console.log(response);
                this.props.updateShippingDetails(obj);
            }catch(err){
                console.log(err);
            }
        }
    }

    render() {
        
        const { shipping } = this.props;

        return (
            <Formik
                initialValues={shipping || initialValues}
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

const mapStateToProps = (state) => {
    return {
        shipping: state.shippingInfo.shippingDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateShippingDetails: (data) => dispatch(updateShippingDetails(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShippingForm);