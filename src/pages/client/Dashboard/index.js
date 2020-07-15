import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../../components/client/shared/Header';
import ProductList from '../../../components/client/ProductList';
import Footer from '../../../components/client/shared/Footer';
import FilterProductList from '../../../components/client/FilterProductList';
import { getUserLoggedInDetails } from '../../../common/actions';
import ApiService from '../../../utilities/ApiService';
import { FETCH_PRODUCTS } from '../../../common/constants/urls';
import Pagination from '../../../components/client/Pagination';
import { MIN_VALUE, MAX_VALUE } from '../../../components/client/constants';

class Dashboard extends Component {

    state = {
        totalPages: 1,
        currentPage: 0,
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
            // this.props.history.push("/")
        } else {
            this.props.getUserLoggedInDetails(userLoggedIn);
        }
        this.fetchFilteredProducts();
    }

    fetchFilteredProducts = async () => {
        // const token = JSON.parse(localStorage.getItem("userLoggedIn")).token;
        const { 
            filterProductName, 
            filterMinRange, 
            filterMaxRange ,
            currentPage
        } = this.state;
        const obj = {
            name: filterProductName,
            min: filterMinRange,
            max: filterMaxRange,
            page: currentPage
        }
        try {
            const response = await ApiService.post(`${FETCH_PRODUCTS}`, obj);
            const parsedResponse = JSON.parse(response.RESPONSE);
            this.setState({
                ...this.state,
                totalPages: Number(parsedResponse.totalPages),
                products: parsedResponse.content,
                copyProducts: parsedResponse.content
            })
        }catch(err) {   
            console.log(err);
        }
    }
    
    setFilterProductName = (productName) => {
        this.setState({
            ...this.state,
            filterProductName: productName
        }, () => {
            this.fetchFilteredProducts();
        })
    }

    setFilterPriceRange = (filterMinRange, filterMaxRange) => {
        this.setState({
            ...this.state,
            filterMinRange: Number(filterMinRange),
            filterMaxRange: Number(filterMaxRange)
        }, () => {
            this.fetchFilteredProducts();
        })
    }

    setResetFilter = () => {
        this.setState({
            ...this.state,
            filterProductName: '',
            filterMinRange: MIN_VALUE,
            filterMaxRange: MAX_VALUE
        }, () => {
            this.fetchFilteredProducts();
        })
    }

    setCurrentPage = (currentPage) => {
        this.setState({
            ...this.state,
            currentPage
        }, () => {
            this.fetchFilteredProducts();
        })
    }

    render() {

        const { products, totalPages } = this.state;

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
                <Pagination 
                    totalPages = {totalPages}
                    setCurrentPage = {this.setCurrentPage}
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