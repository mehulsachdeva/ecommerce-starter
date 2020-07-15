import React, { Component } from 'react';

class AmountDetails extends Component {
    render() {
        
        const { amount } = this.props;

        return (
            <div>
                <div>
                    CheckOut Amount
                </div>
                <div>
                    { amount }
                </div>
            </div>
        );
    }
}

export default AmountDetails;