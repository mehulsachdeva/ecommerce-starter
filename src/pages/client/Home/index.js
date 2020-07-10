import React, { Component } from 'react';
import Header from '../../../components/client/shared/Header';
import ProductList from '../../../components/client/ProductList';
import Footer from '../../../components/client/shared/Footer';
import FilterProductList from '../../../components/client/FilterProductList';

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

class Home extends Component {

    state = {
        products: [],
        copyProducts: [],
        filterProductName: '',
        filterMinRange: 0,
        filterMaxRange: 999999999,
    }

    componentDidMount = () => {
        this.setState({
            ...this.state,
            products: data,
            copyProducts: data
        }, () => {
            this.performFilteringOnProducts();
        })
    }
    
    setFilterProductName = (productName) => {
        this.setState({
            ...this.state,
            filterProductName: productName
        }, () => {
            this.performFilteringOnProducts();
        })
    }

    setFilterPriceRange = (filterMinRange, filterMaxRange) => {
        this.setState({
            ...this.state,
            filterMinRange: Number(filterMinRange),
            filterMaxRange: Number(filterMaxRange)
        }, () => {
            this.performFilteringOnProducts();
        })
    }

    setResetFilter = () => {
        this.setState({
            ...this.state,
            filterProductName: '',
            filterMinRange: 0,
            filterMaxRange: 999999999
        }, () => {
            this.performFilteringOnProducts();
        })
    }

    performFilteringOnProducts = () => {
        const { 
            copyProducts, 
            filterProductName, 
            filterMinRange, 
            filterMaxRange 
        } = this.state;
        this.setState({
            ...this.state,
            products: copyProducts.filter((product) => 
                product.name.toLowerCase().includes(filterProductName.toLowerCase()) &&
                product.price >= filterMinRange && product.price <= filterMaxRange
            )
        })
    }

    render() {

        const { products } = this.state;

        return (
            <div>
                <Header />
                <FilterProductList 
                    setFilterProductName = {this.setFilterProductName}
                    setFilterPriceRange = {this.setFilterPriceRange}
                    setResetFilter = {this.setResetFilter}
                />
                <ProductList 
                    products = {products}
                />
                <Footer />
            </div>
        );
    }
}

export default Home;