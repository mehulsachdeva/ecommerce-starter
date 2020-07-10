import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
    render() {

        const { productsInCart } = this.props;

        return (
            <div>
                <nav>
                    <ul>
                        <li>
                            Products
                        </li>
                        <li>
                            Cart: {productsInCart.length}
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        productsInCart: state.cartInfo.cart
    }
}

export default connect(
    mapStateToProps,
    null
)(Header);