import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartList from '../../../components/client/CartList';
import { getUserLoggedInDetails, updateShippingDetails } from '../../../common/actions';
import ShippingDetails from '../../../components/client/ShippingDetails';
import AmountDetails from '../../../components/client/AmountDetails';
import PrimaryButton from '../../../components/client/shared/PrimaryButton';
import ApiService from '../../../utilities/ApiService';
import { FETCH_SHIPPING_DETAILS } from '../../../common/constants/urls';

class Cart extends Component {

    state = {
        checkOutProducts: [],
        checkOutAmount: 0
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
        this.fetchShippingDetails(userLoggedIn.userId, userLoggedIn.token);
    }

    calcTotalCheckOutAmount = (cart) => {
        let amount = 0;
        let checkOutProducts = [];
        cart.map((item) => {
            if(item.isAvailable) {
                amount += item.price;
                checkOutProducts.push(item);
            }
        })
        this.setState({
            ...this.state,
            checkOutProducts,
            checkOutAmount: amount
        })
    }

    fetchShippingDetails = async (userId, token) => {
        try {
            const response = await ApiService.getWithAuthorization(`${FETCH_SHIPPING_DETAILS}/${userId}`, token);
            const values = JSON.parse(response.RESPONSE);
            this.props.updateShippingDetails(values);
        }catch(err) {
            console.log(err);
        }
    }

    render() {

        const { checkOutAmount, checkOutProducts } = this.state;
        const { 
            cart, 
            userLoggedIn, 
            shipping 
        } = this.props;

        return (
            <div>
                <CartList 
                    cart = {cart}
                    token = {userLoggedIn.token}
                    calcTotalCheckOutAmount = {this.calcTotalCheckOutAmount}
                />
                 <ShippingDetails 
                    shipping = {shipping}
                />
                <PrimaryButton 
                    link = {true}
                    redirectTo = {"/shipping"}
                    text = {"UPDATE SHIPPING DETAILS"}
                />
                {
                    checkOutAmount > 0 && (
                        <AmountDetails 
                            amount = {checkOutAmount}
                        />
                    )
                }
                {
                    checkOutAmount > 0 && (
                        <PrimaryButton 
                            link = {true}
                            redirectTo = {"/checkout"}
                            text = {"PROCEED"}
                            props = {{ checkOutProducts, checkOutAmount, shipping }}
                        />
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cartInfo.cart,
        userLoggedIn: state.userLoggedInInfo.user,
        shipping: state.shippingInfo.shippingDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserLoggedInDetails: (data) => dispatch(getUserLoggedInDetails(data)),
        updateShippingDetails: (data) => dispatch(updateShippingDetails(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);
