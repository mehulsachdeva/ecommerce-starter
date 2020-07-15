import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AmountDetails from '../../../components/client/AmountDetails';
import PrimaryButton from '../../../components/client/shared/PrimaryButton';
import ApiService from '../../../utilities/ApiService';
import { MAKE_PURCHASE } from '../../../common/constants/urls';
import { getUserLoggedInDetails, resetCartState, resetShippingState } from '../../../common/actions';

class CheckOut extends Component {

    componentWillMount = () => {
        const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"));
        if(!userLoggedIn || 
           !userLoggedIn.userId ||
           !userLoggedIn.email ||
           !userLoggedIn.token 
        ) {
            // this.props.history.push("/")
        } else {
            this.props.getUserLoggedInDetails(userLoggedIn);
        }
    }

    makePurchase = async () => {
        const { props } = this.props.location.state;
        const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"));
        const address = props.shipping.addressLine1 + ", " + props.shipping.addressLine2 + ", " +
                        props.shipping.city + ", " + props.shipping.country + ", " + props.shipping.postalCode;
        const values = {
            userId: userLoggedIn ? userLoggedIn.userId : -1,
            products: JSON.stringify(props.checkOutProducts),
            totalAmount: props.checkOutAmount,
            paymentOption: "COD",
            paymentStatus: "Pending",
            address
        }
        try {
            const response = await ApiService.post(`${MAKE_PURCHASE}`, values);
            this.props.resetCartState();
            this.props.resetShippingState();
            this.props.history.push("/dashboard");
        }catch(err) {
            this.props.history.push("/cart");
            console.log(err);
        }
    }

    render() {

        const { props } = this.props.location.state;

        return (
            <div>
                <div>
                    {
                        props.checkOutProducts.map((product, index) => {
                            return (
                                <div key = {index}>
                                    <div>
                                        {product.name}
                                    </div>
                                    <div>
                                        {product.price}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <AmountDetails 
                    amount = {props.checkOutAmount}
                />
                <PrimaryButton 
                    link = {false}
                    action = {this.makePurchase}
                    text = {"PLACE ORDER"}
                    props = {{ 
                        checkOutProducts: props.checkOutProducts, 
                        checkOutAmount: props.checkOutAmount 
                    }}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserLoggedInDetails: (data) => dispatch(getUserLoggedInDetails(data)),
        resetCartState: () => dispatch(resetCartState()),
        resetShippingState: () => dispatch(resetShippingState())
    }
}

export default connect(
    null,
    mapDispatchToProps
)(withRouter(CheckOut));
