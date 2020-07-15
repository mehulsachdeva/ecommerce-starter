import React, { Component } from 'react';
import { connect } from 'react-redux';
import ShippingForm from '../../../components/client/ShippingForm';
import { getUserLoggedInDetails } from '../../../common/actions';

class Shipping extends Component {

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
    }

    render() {

        const { userLoggedIn } = this.props;

        return (
            <div>
                <ShippingForm 
                    userId = {userLoggedIn.userId}
                    token = {userLoggedIn.token}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userLoggedIn: state.userLoggedInInfo.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserLoggedInDetails: (data) => dispatch(getUserLoggedInDetails(data)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Shipping);