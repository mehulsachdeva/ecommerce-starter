import React, { Component } from 'react';
import { connect } from 'react-redux';
import ApiService from '../../../utilities/ApiService';
import { FETCH_PRODUCT_BY_ID } from '../../../common/constants/urls';
import { removeProductFromCart } from '../../../common/actions';

class CartList extends Component {

    state = {
        cart: []
    }

    componentWillMount = () => {
        const { cart } = this.props;
        this.fetchDetailsOfEachCartItem(cart);
    }

    fetchDetailsOfEachCartItem = async (cart) => {
        const { token } = this.props;
        try {
            for(let i = 0; i < cart.length; i++) {
                const response = await ApiService.getWithAuthorization(`${FETCH_PRODUCT_BY_ID}/${cart[i].productId}`, token);
                const parsedResponse = JSON.parse(response.RESPONSE);
                this.setState({
                    ...this.state,
                    cart: [
                        ...this.state.cart,
                        {
                            ...parsedResponse,
                        }
                    ]
                }, () => {
                    this.props.calcTotalCheckOutAmount(this.state.cart);
                })
            }
        }catch(err) {
            console.log(err);
        }
    }

    removeFromCart = (selectedProductId) => {
        const { cart } = this.state;
        this.props.removeProductFromCart(selectedProductId);
        this.setState({
            ...this.state,
            cart: cart.filter((item) => item.productId !== selectedProductId)
        }, () => {
            this.props.calcTotalCheckOutAmount(this.state.cart);
        })
    }

    render() {

        const { cart } = this.state;

        return (
            <div>
                {
                    cart && cart.length > 0 ? (
                        cart.map((item, index) => {
                            return (
                                <div key = {index}>
                                    {
                                        item.isAvailable ? (
                                            <div>
                                                <div>
                                                    {item.name}
                                                </div>
                                                <div>
                                                    {item.price}
                                                </div>
                                                <div>
                                                    <button
                                                        onClick = {() => this.removeFromCart(item.productId)}
                                                    >
                                                        Remove From Cart
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div>
                                                    SOLD OUT
                                                </div>
                                                <div>
                                                    {item.name}
                                                </div>
                                                <div>
                                                    {item.price}
                                                </div>
                                                <div>
                                                    <button
                                                        onClick = {() => this.removeFromCart(item.productId)}
                                                    >
                                                        Remove From Cart
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            );
                        })
                    ) : (
                        <div>
                            No Products In Cart
                        </div>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        productsInCart: state.cartInfo.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeProductFromCart: (data) => dispatch(removeProductFromCart(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartList);
