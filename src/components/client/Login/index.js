import React, { Component } from 'react';

class Login extends Component {

    loginUser = (e) => {
        e.preventDefault();
    } 

    render() {
        return (
            <form onSubmit = {this.loginUser}>
                <div>
                    <input 
                        type = "text" 
                        placeholder = "Email" 
                    />
                </div>
                <div>
                    <input 
                        type = "password" 
                        placeholder = "Password" 
                    />
                </div>
                <div>
                    <input 
                        type = "submit" 
                        value = "LOGIN" 
                    />
                </div>
            </form>
        );
    }
}

export default Login;