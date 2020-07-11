import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartList from '../../../components/client/CartList';
import { getUserLoggedInDetails } from '../../../common/actions';
import ShippingForm from '../../../components/client/ShippingForm';
import ApiService from '../../../utilities/ApiService';
import { FETCH_SHIPPING_DETAILS } from '../../../common/constants/urls';

class Cart extends Component {

    state = {
        values: {}
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
    }

    render() {

        const { values } = this.state;
        const { cart, userLoggedIn } = this.props;

        return (
            <div>
                <CartList 
                    cart = {cart}
                />
                <ShippingForm 
                    values = {values}
                    userId = {userLoggedIn.userId}
                    token = {userLoggedIn.token}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cartInfo.cart,
        userLoggedIn: state.userLoggedInInfo.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserLoggedInDetails: (data) => dispatch(getUserLoggedInDetails(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);
