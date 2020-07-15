import React, { Component } from 'react';

class PurchasesList extends Component {
    render() {

        const { purchases } = this.props;

        return (
            <div>
                {
                    purchases.map((purchase, index) => {
                        return (
                            <div key = {index}>
                                <div>
                                    Products: {
                                        JSON.parse(purchase.products).map((product, innerIndex) => {
                                            return (
                                                <div key = {innerIndex}>
                                                    <div>
                                                        {product.name}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                                <div>
                                    Total Amount: {purchase.totalAmount}
                                </div>
                                <div>
                                    Payment Option: {purchase.paymentOption}
                                </div>
                                <div>
                                    Status: {purchase.paymentStatus}
                                </div>
                                <div>
                                    Address: {purchase.address}
                                </div>
                                <div>
                                    Date of Purchase: {purchase.dateOfPurchase}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default PurchasesList;