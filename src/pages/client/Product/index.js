import React, { Component } from 'react';
import ProductView from '../../../components/client/ProductView';
import Header from '../../../components/client/shared/Header';

const data = [
    {
        id: 1,
        name: 'Product 1',
        description: 'Product 1 Description',
        price: 1000
    },
    {
        id: 2,
        name: 'Product 2',
        description: 'Product 2 Description',
        price: 1200
    },
    {
        id: 3,
        name: 'Product 3',
        description: 'Product 3 Description',
        price: 2700
    },
    {
        id: 4,
        name: 'Product 4',
        description: 'Product 4 Description',
        price: 5200
    }
];

class Product extends Component {

    state = {
        product: [],
        productInCart: false
    }

    componentWillMount = () => {
        const { id } = this.props.match.params;
        const productInCart = this.isProductAlreadyAddedToCart(Number(id));
        const product = data.filter((item) => item.id === Number(id));
        this.setState({
            ...this.state,
            product,
            productInCart
        })
    }

    isProductAlreadyAddedToCart(selectedProductId) {
        const { productsInCart } = this.props.location.state;
        let status = false;
        for(let i = 0; i < productsInCart.length; i++) {
            if(productsInCart[i].id === selectedProductId) {
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
                    product.length > 0 && 
                    <ProductView 
                        product = {product}
                        productInCart = {productInCart}
                    />
                }
            </div>
        );
    }
}

export default Product;