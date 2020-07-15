import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginForm from '../../../components/client/LoginForm';
import { getUserLoggedInDetails } from '../../../common/actions';

class Home extends Component {

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
            this.props.history.push("/dashboard");
        }
    }

    render() {
        return (
            <div>
                <LoginForm />
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
)(withRouter(Home));
