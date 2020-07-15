import React, { Component } from 'react';
import ApiService from '../../../utilities/ApiService';
import { FETCH_ALL_PURCHASES } from '../../../common/constants/urls';
import PurchasesList from '../../../components/admin/PurchasesList';

class AllPurchases extends Component {

    state = {
        purchases: []
    }

    componentWillMount = () => {
        const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"));
        if(!userLoggedIn || 
           !userLoggedIn.userId ||
           !userLoggedIn.email ||
           !userLoggedIn.token 
        ) {
            this.props.history.push("/")
        }
        this.fetchAllPurchases(userLoggedIn.token )
    }

    fetchAllPurchases = async (token) => {
        try {
            const response = await ApiService.getWithAuthorization(FETCH_ALL_PURCHASES, token);
            console.log(response);
            this.setState({
                ...this.state,
                purchases: JSON.parse(response.RESPONSE)
            })
        }catch(err) {
            console.log(err);
        }
    }

    render() {

        const { purchases } = this.state;

        return (
            <div>
                <PurchasesList
                    purchases = {purchases}
                />
            </div>
        );
    }
}

export default AllPurchases;