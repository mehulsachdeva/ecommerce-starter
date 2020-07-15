import React, { Component } from 'react';
import ProductForm from '../../../components/admin/ProductForm';

class AddProduct extends Component {

    state = {
        token: '',
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
        
        this.setState({
            ...this.state,
            token: userLoggedIn.token 
        })
    }

    render() {

        const { token } = this.state;

        return (
            <div>
                <ProductForm 
                    token = {token}
                />
            </div>
        );
    }
}

export default AddProduct;