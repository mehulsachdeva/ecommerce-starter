import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addProductToCart, removeProductFromCart } from '../../../common/actions';

class ProductList extends Component {

    state = {
        productsInCart: []
    }

    componentWillReceiveProps = (props) => {
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

    addToCart = (selectedProductId) => {
        const { products } = this.props;
        const productSelected = products.filter((product) => product.id === selectedProductId);
        this.props.addProductToCart(...productSelected);
    }

    removeFromCart = (selectedProductId) => {
        this.props.removeProductFromCart(selectedProductId);
    }

    render() {
        
        const { products } = this.props;
        const { productsInCart } = this.state;

        return (
            <div>
                {
                    products.length > 0 ? (
                        products.map((product, index) => {
                            return (
                                    <div key = {index}>
                                        <Link to = {{
                                            pathname: `/product/${product.id}`,
                                            state: {
                                                productsInCart: productsInCart
                                            }
                                        }}>
                                            <div>
                                                Name: {product.name}
                                            </div>
                                            <div>
                                                Description: {product.description}
                                            </div>
                                            <div>
                                                Price: {product.price}
                                            </div>
                                        </Link>
                                        <div>
                                            {
                                                this.isProductAlreadyAddedToCart(product.id) ? (
                                                    <div>
                                                        <div>
                                                            Product In Cart
                                                        </div>
                                                        <div>
                                                            <button
                                                                onClick = {() => this.removeFromCart(product.id)}
                                                            >
                                                                Remove From Cart
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <button 
                                                        onClick = {() => this.addToCart(product.id)}
                                                    >
                                                        Add To Cart
                                                    </button>
                                                )
                                            }
                                        </div>
                                    </div>
                            );
                        })
                    ) : (
                        <div>
                            No Product Found
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
        addProductToCart: (data) => dispatch(addProductToCart(data)),
        removeProductFromCart: (data) => dispatch(removeProductFromCart(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);