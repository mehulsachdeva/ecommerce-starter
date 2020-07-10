import React, { Component } from 'react';

class Register extends Component {

    registerUser = (e) => {
        e.preventDefault();
    } 

    render() {
        return (
            <form onSubmit = {this.registerUser}>
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
                        type = "password" 
                        placeholder = "Confirm Password" 
                    />
                </div>
                <div>
                    <input 
                        type = "submit" 
                        value = "REGISTER" 
                    />
                </div>
            </form>
        );
    }
}

export default Register;