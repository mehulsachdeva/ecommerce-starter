import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProductToCart, removeProductFromCart } from '../../../common/actions';

class ProductView extends Component {

    state = {
        product: [],
        productsInCart: [],
        productInCart: false
    }

    componentWillMount = () => {
        const { product, productInCart } = this.props;
        this.setState({
            ...this.state,
            product,
            productInCart
        })
    }

    componentWillUpdate = (props) => {
        const { productsInCart } = props;
        if(productsInCart.length !== this.state.productsInCart.length) {
            this.setState({
                ...this.state,
                productsInCart
            })
        }
    }
    
    isProductAlreadyAddedToCart(selectedProductId) {
        const { productsInCart } = this.state;
        let status = false;
        if(productsInCart) {
            for(let i = 0; i < productsInCart.length; i++) {
                if(productsInCart[i].id === selectedProductId) {
                    status = true;
                    break;
                }
            }
        }
        return status;
    }

    addToCart = () => {
        const productSelected = this.props.product[0];
        this.props.addProductToCart(productSelected);
        this.setState({
            ...this.state,
            productInCart: true
        })
    }

    removeFromCart = (selectedProductId) => {
        this.props.removeProductFromCart(selectedProductId);
        this.setState({
            ...this.state,
            productInCart: false
        })
    }

    render() {

        const { product, productInCart } = this.state;

        return (
            <div>
                <div>
                    <div>
                        {product[0].name}
                    </div>
                    <div>
                        {product[0].description}
                    </div>
                    <div>
                        {product[0].price}
                    </div>
                </div>
                <div>
                    <div>
                        {
                            productInCart ? (
                                <div>
                                    <div>
                                        Product In Cart
                                    </div>
                                    <div>
                                        <button
                                            onClick = {() => this.removeFromCart(product[0].id)}
                                        >
                                            Remove From Cart
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button 
                                    onClick = {this.addToCart}
                                >
                                    Add To Cart
                                </button>
                            )
                        }
                    </div>
                </div>
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
        addProductToCart: (data) => dispatch(addProductToCart(data)),
        removeProductFromCart: (data) => dispatch(removeProductFromCart(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductView);