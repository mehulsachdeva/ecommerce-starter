import React, { Component } from 'react';
import { Formik } from 'formik';
import ApiService from '../../../utilities/ApiService';
import { ADD_PRODUCT } from '../../../common/constants/urls';

const initialValues = {
    name: '',
    description: '',
    price: '',
    isAvailable: '1',
}

const validation = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Required';
    }
    if (!values.description) {
        errors.description = 'Required';
    } 
    if (!values.price) {
        errors.price = 'Required';
    } 
    if (!values.isAvailable) {
        errors.isAvailable = 'Required';
    } 
    return errors;
}

class ProductForm extends Component {

    handleSubmit = (values) => {
        this.addProduct(values);
    }

    addProduct = async (values) => {
        const { token } = this.props;
        try {
            const response = await ApiService.postWithAuthorization(ADD_PRODUCT, values, token);
            console.log(response);
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
                                    type = "text"
                                    name = "name"
                                    placeholder = "Product Name"
                                    onChange = {handleChange}
                                    onBlur = {handleBlur}
                                    value = {values.name}
                                />
                            </div>
                            <div>
                                {errors.name && touched.name && errors.name}
                            </div>
                        </div>
                        <div>
                            <div>
                                <textarea
                                    type = "text"
                                    name = "description"
                                    placeholder = "Descriptione"
                                    onChange = {handleChange}
                                    onBlur = {handleBlur}
                                    value = {values.description}
                                ></textarea>
                            </div>
                            <div>
                                {errors.description && touched.description && errors.description}
                            </div>
                        </div>
                        <div>
                            <div>
                                <input
                                    type = "number"
                                    name = "price"
                                    placeholder = "Price"
                                    onChange = {handleChange}
                                    onBlur = {handleBlur}
                                    value = {values.price}
                                />
                            </div>
                            <div>
                                {errors.price && touched.price && errors.price}
                            </div>
                        </div>
                        <div>
                            <div>
                                <select
                                    name = "isAvailable"
                                    onChange = {handleChange}
                                    onBlur = {handleBlur}
                                    value = {values.isAvailable}
                                >
                                    <option value = '1'>Available</option>
                                    <option value = '0'>Not Available</option>
                                </select>
                            </div>
                            <div>
                                {errors.isAvailable && touched.isAvailable && errors.isAvailable}
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

export default ProductForm;