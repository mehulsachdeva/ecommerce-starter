import React, { Component } from 'react';
import { Formik } from 'formik';
import ApiService from '../../../utilities/ApiService';
import { ADD_PRODUCT, UPDATE_PRODUCT } from '../../../common/constants/urls';
import { PRODUCT_CATEGORY_MENU_OPTIONS } from '../constants';

const validation = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Required';
    }
    if (!values.description) {
        errors.description = 'Required';
    } 
    if(!values.category) {
        errors.category = 'Required';
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

    state = {
        images: []
    }

    componentDidMount = () => {
        const { productInitialValues } = this.props;
        const images = productInitialValues.images ? JSON.parse(productInitialValues.images) : [];
        this.setState({
            ...this.state,
            images
        })
    }

    insertNewImage = () => {
        this.setState({
            ...this.state,
            images: this.state.images.concat("")
        })
    }

    deleteImage = (index) => {
        this.setState({
            ...this.state,
            images: this.state.images.filter((image, i) => index !== i)
        })
    }

    setImage = (e, index) => {
        e.preventDefault();
        let { images } = this.state;
        images[index] = e.target.value;
        this.setState({
            ...this.state,
            images
        })
    }

    handleSubmit = (values, { setSubmitting }) => {
        const images = this.state.images.filter((image) => image !== "");
        
        const { 
            edit, 
            productId, 
            productInitialValues 
        } = this.props;
        const version = productInitialValues.version;

        let dimensions = [];
        dimensions.push(values.dimensionsX);
        dimensions.push(values.dimensionsY);
        dimensions.push(values.dimensionsZ);

        const details = {
            material: values.material,
            dimensions
        };

        const artistInfo = {
            artistName: values.artistName,
            artistEmail: values.artistEmail,
            artistContact: values.artistContact
        };

        const obj = {
            name: values.name,
            description: values.description,
            details: JSON.stringify(details),
            category: values.category,
            price: values.price,
            isAvailable: values.isAvailable,
            images: JSON.stringify(images),
            artistInfo: JSON.stringify(artistInfo),
            version: Number(version)
        }

        if(edit) {
            const updateObj = {
                productId: Number(productId),
                ...obj
            }
            this.updateProduct(updateObj);
        }else {
            this.addProduct(obj);
        }
        setSubmitting(false);
    }

    addProduct = async (obj) => {
        const { token } = this.props;
        try {
            const response = await ApiService.postWithAuthorization(ADD_PRODUCT, obj, token);
            console.log(response);
        }catch(err) {
            console.log(err);
        }
    }

    updateProduct = async (obj) => {
        const { token } = this.props;
        try {
            const response = await ApiService.postWithAuthorization(UPDATE_PRODUCT, obj, token);
            console.log(response);
        }catch(err) {
            console.log(err);
        }
    }

    render() {

        const { images } = this.state;
        const { edit, productInitialValues } = this.props;
        const details = productInitialValues.details && JSON.parse(productInitialValues.details);
        const artistInfo = productInitialValues.artistInfo && JSON.parse(productInitialValues.artistInfo);
        const initialValues = {
            name: productInitialValues ? productInitialValues.name : '',
            description: productInitialValues ? productInitialValues.description : '',
            material: details ? details.material : '',
            dimensionsX: details ? details.dimensions[0] : '',
            dimensionsY: details ? details.dimensions[1] : '',
            dimensionsZ: details ? details.dimensions[2] : '',
            category: productInitialValues ? productInitialValues.category : '',
            price: productInitialValues ? productInitialValues.price : '',
            isAvailable: productInitialValues ? productInitialValues.isAvailable : '1',
            artistName: artistInfo ? artistInfo.artistName : '',
            artistEmail: artistInfo ? artistInfo.artistEmail : '',
            artistContact: artistInfo ? artistInfo.artistContact : ''
        }

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
                                    placeholder = "Description"
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
                                    type = "text"
                                    name = "material"
                                    placeholder = "Material"
                                    onChange = {handleChange}
                                    onBlur = {handleBlur}
                                    value = {values.material}
                                />
                            </div>
                        </div>
                        <div>
                            <div>
                                <input
                                    type = "text"
                                    name = "dimensionsX"
                                    onChange = {handleChange}
                                    onBlur = {handleBlur}
                                    value = {values.dimensionsX}
                                />
                            </div>
                            <div>
                                <input
                                    type = "text"
                                    name = "dimensionsY"
                                    onChange = {handleChange}
                                    onBlur = {handleBlur}
                                    value = {values.dimensionsY}
                                />
                            </div>
                            <div>
                                <input
                                    type = "text"
                                    name = "dimensionsZ"
                                    onChange = {handleChange}
                                    onBlur = {handleBlur}
                                    value = {values.dimensionsZ}
                                />
                            </div>
                        </div>
                        <div>
                            <div>
                                <select
                                    name = "category"
                                    onChange = {handleChange}
                                    onBlur = {handleBlur}
                                    value = {values.category}
                                >
                                    {
                                        PRODUCT_CATEGORY_MENU_OPTIONS.map((category, index) => {
                                            return (
                                                <option 
                                                    key = {index}
                                                    value = {category}
                                                >
                                                    {category}
                                                </option>
                                            );
                                        })
                                    }
                                </select>
                            </div>
                            <div>
                                {errors.category && touched.category && errors.category}
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
                            <div>
                                <button
                                    type = "button"
                                    onClick = {this.insertNewImage}
                                >
                                    INSERT NEW IMAGE
                                </button>
                            </div>
                            <div>
                                {
                                    images.map((image, index) => {
                                        return (
                                            <div key = {index}>
                                                <div>
                                                    <input 
                                                        type = "text"
                                                        placeholder = "Image Link"
                                                        value = {image}
                                                        onChange = {(e) => this.setImage(e, index)}
                                                    />
                                                </div>
                                                <div>
                                                    <button
                                                        type = "button"
                                                        onClick = {() => this.deleteImage(index)}
                                                    >
                                                        Delete
                                                    </button>

                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        <div>
                            <div>
                                <input
                                    type = "text"
                                    name = "artistName"
                                    placeholder = "Artist Name"
                                    onChange = {handleChange}
                                    onBlur = {handleBlur}
                                    value = {values.artistName}
                                />
                            </div>
                            <div>
                                <input
                                    type = "text"
                                    name = "artistEmail"
                                    placeholder = "Artist Email"
                                    onChange = {handleChange}
                                    onBlur = {handleBlur}
                                    value = {values.artistEmail}
                                />
                            </div>
                            <div>
                                <input
                                    type = "number"
                                    name = "artistContact"
                                    placeholder = "Artist Contact"
                                    onChange = {handleChange}
                                    onBlur = {handleBlur}
                                    value = {values.artistContact}
                                />
                            </div>
                        </div>
                        <div>
                            {
                                edit ? (
                                    <button 
                                        type = "submit" 
                                        disabled = {isSubmitting}
                                    >
                                        Update
                                    </button>
                                ) : (
                                    <button 
                                        type = "submit" 
                                        disabled = {isSubmitting}
                                    >
                                        Submit
                                    </button>
                                )
                            }
                        </div>
                    </form>
                )}
            </Formik>
        );
    }
}

export default ProductForm;