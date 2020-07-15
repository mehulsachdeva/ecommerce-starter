import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { 
    getUserLoggedInDetails, 
    resetCartState, 
    resetShippingState,
    resetUserState
} from '../../../../common/actions';

class Header extends Component {

    logout = () => {
        localStorage.removeItem("userLoggedIn");
        this.props.resetUserState();
        this.props.resetCartState();
        this.props.resetShippingState();
        this.props.history.push("/");
    }

    render() {

        const { productsInCart, userLoggedIn } = this.props;

        return (
            <div>
                <nav>
                    <ul>
                        <li>
                            Home
                        </li>
                        {
                            userLoggedIn.userId && 
                            userLoggedIn.email && 
                            userLoggedIn.token && (
                                <li>
                                    <Link to = "/purchases">
                                        Purchases
                                    </Link>
                                </li>
                            )
                        }
                        <li>
                            About Us
                        </li>
                        <li>
                            <Link to = "/cart">
                                Cart: {productsInCart.length}
                            </Link>
                        </li>
                        {
                            userLoggedIn.userId && 
                            userLoggedIn.email && 
                            userLoggedIn.token && (
                                <div>
                                    <div>
                                        Hi, {userLoggedIn.email}
                                    </div>
                                    <div
                                        onClick = {this.logout}
                                    >
                                        Logout
                                    </div>
                                </div>
                            )
                        }
                    </ul>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        productsInCart: state.cartInfo.cart,
        userLoggedIn: state.userLoggedInInfo.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserLoggedInDetails: (data) => dispatch(getUserLoggedInDetails(data)),
        resetCartState: () => dispatch(resetCartState()),
        resetShippingState: () => dispatch(resetShippingState()),
        resetUserState: () => dispatch(resetUserState())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Header));