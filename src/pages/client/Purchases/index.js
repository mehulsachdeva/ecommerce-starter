import React, { Component } from 'react';
import { connect } from 'react-redux';
import PurchaseHistory from '../../../components/client/PurchaseHistory';
import ApiService from '../../../utilities/ApiService';
import { FETCH_PURCHASE_HISTORY_BY_ID } from '../../../common/constants/urls';
import { getUserLoggedInDetails } from '../../../common/actions';

class Purchases extends Component {

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
        } else {
            this.props.getUserLoggedInDetails(userLoggedIn);
        }
        this.fetchPurchaseHistory(userLoggedIn.userId, userLoggedIn.token);
    }

    fetchPurchaseHistory = async (userId, token) => {
        try {
            const response = await ApiService.getWithAuthorization(`${FETCH_PURCHASE_HISTORY_BY_ID}/${userId}`, token);
            this.setState({
                ...this.state,
                purchases: JSON.parse(response.RESPONSE)
            })
        }catch(err) {
            console.log(err)
        }
    }

    render() {

        const { purchases } = this.state;

        return (
            <div>
                <PurchaseHistory 
                    purchases = {purchases}
                />
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
)(Purchases);