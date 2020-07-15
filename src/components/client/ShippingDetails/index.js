import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ShippingDetails extends Component {
    render() {

        const { shipping } = this.props;

        return (
            <div>
                <div>
                    Delivery To:
                </div>
                <div>
                    {shipping.addressLine1},
                    {shipping.addressLine2},
                    {shipping.postalCode},
                    {shipping.city},
                    {shipping.country}
                </div>
            </div>
        );
    }
}

export default ShippingDetails;