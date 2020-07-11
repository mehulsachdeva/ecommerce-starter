import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../../components/client/shared/Header';
import ProductList from '../../../components/client/ProductList';
import Footer from '../../../components/client/shared/Footer';
import FilterProductList from '../../../components/client/FilterProductList';
import { getUserLoggedInDetails } from '../../../common/actions';

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

class Dashboard extends Component {

    state = {
        products: [],
        copyProducts: [],
        filterProductName: '',
        filterMinRange: 0,
        filterMaxRange: 999999999,
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

const mapDispatchToProps = (dispatch) => {
    return {
        getUserLoggedInDetails: (data) => dispatch(getUserLoggedInDetails(data))
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Dashboard);