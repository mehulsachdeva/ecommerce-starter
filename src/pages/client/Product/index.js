import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductView from '../../../components/client/ProductView';
import Header from '../../../components/client/shared/Header';
import ApiService from '../../../utilities/ApiService';
import { FETCH_PRODUCT_BY_ID } from '../../../common/constants/urls';
import { getUserLoggedInDetails } from '../../../common/actions';

class Product extends Component {

    state = {
        product: [],
        productInCart: false
    }

    componentWillMount = () => {
        const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"));
        if(!userLoggedIn || 
           !userLoggedIn.userId ||
           !userLoggedIn.email ||
           !userLoggedIn.token 
        ) {
            this.props.history.push("/")
        } else {
            this.props.getUserLoggedInDetails(userLoggedIn);
        }
        const { productId } = this.props.match.params;
        this.fetchProductById(productId, userLoggedIn.token);

    }

    fetchProductById = async (productId, token) => {
        try {
            const response = await ApiService.getWithAuthorization(`${FETCH_PRODUCT_BY_ID}/${productId}`, token);
            const productInCart = this.isProductAlreadyAddedToCart(Number(productId));
            this.setState({
                ...this.state,
                product: JSON.parse(response.RESPONSE),
                productInCart
            })
        }catch(err) {
            console.log(err);
        }
    }

    isProductAlreadyAddedToCart(selectedProductId) {
        const { productsInCart } = this.props.location.state;
        let status = false;
        for(let i = 0; i < productsInCart.length; i++) {
            if(productsInCart[i].productId === selectedProductId) {
                status = true;
                break;
            }
        }
        return status;
    }

    render() {
        
        const { product, productInCart } = this.state;

        return (
            <div>
                <Header />
                {
                    Object.keys(product).length > 0 && (
                        <ProductView 
                            product = {product}
                            productInCart = {productInCart}
                        />
                    )
                }
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserLoggedInDetails: (data) => dispatch(getUserLoggedInDetails(data))
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Product);