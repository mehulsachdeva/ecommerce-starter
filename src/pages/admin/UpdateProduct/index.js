import React, { Component } from 'react';
import ProductForm from '../../../components/admin/ProductForm';
import ApiService from '../../../utilities/ApiService';
import { FETCH_PRODUCT_BY_ID } from '../../../common/constants/urls';

class UpdateProduct extends Component {

    state = {
        productId: 0,
        token: '',
        productInitialValues: {}
    }

    componentWillMount = () => {

        const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"));
        if(!userLoggedIn || 
           !userLoggedIn.userId ||
           !userLoggedIn.email ||
           !userLoggedIn.token 
        ) {
            this.props.history.push("/")
        }

        const { productId } = this.props.match.params;
        this.setState({
            ...this.state,
            productId,
            token: userLoggedIn.token 
        }, () => {
            this.fetchProductDetails(userLoggedIn.token);
        })
    }

    fetchProductDetails = async (token) => {
        const { productId } = this.state;

        try {
            const response = await ApiService.getWithAuthorization(`${FETCH_PRODUCT_BY_ID}/${productId}`, token);

            this.setState({
                ...this.state,
                productInitialValues: JSON.parse(response.RESPONSE)
            })
        }catch(err) {
            console.log(err)
        }
    }

    render() {

        const { token, productId, productInitialValues } = this.state;

        return (
            <div>
                {
                    Object.keys(productInitialValues).length > 0 && (
                        <ProductForm 
                            token = {token}
                            edit = {true}
                            productId = {productId}
                            productInitialValues = {productInitialValues}
                        />
                    )
                }
            </div>
        );
    }
}

export default UpdateProduct;