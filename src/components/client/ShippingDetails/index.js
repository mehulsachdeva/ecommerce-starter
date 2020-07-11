import React, { Component } from 'react';

class ShippingDetails extends Component {
    render() {

        const { shippingDetails } = this.props;

        return (
            <div>
                <div>
                    Delivery To:
                </div>
                <div>
                    {shippingDetails.addressLine1},
                    {shippingDetails.addressLine2},
                    {shippingDetails.postalCode},
                    {shippingDetails.city},
                    {shippingDetails.country},
                </div>
            </div>
        );
    }
}

export default ShippingDetails;