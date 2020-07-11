import React, { Component } from 'react';

class CartList extends Component {
    render() {

        const { cart } = this.props;
        console.log("cart", cart);
        
        return (
            <div>
                {
                    cart && cart.length > 0 && (
                        cart.map((product, index) => {
                            return (
                                <div key = {index}>
                                    <div>
                                        {product.name}
                                    </div>
                                    <div>
                                        {product.price}
                                    </div>
                                </div>
                            );
                        })
                    )
                }
            </div>
        );
    }
}

export default CartList;