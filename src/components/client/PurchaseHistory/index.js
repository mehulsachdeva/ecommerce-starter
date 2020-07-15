import React, { Component } from 'react';

class PurchaseHistory extends Component {
    render() {

        const { purchases } = this.props;
        return (
            <div>
                {
                    purchases ? (
                        purchases.map((purchase, index) => {
                            return (
                                <div key = {index}>
                                    <div>
                                        Products Ordered: {
                                            JSON.parse(purchase.products).map((item, innerIndex) => {
                                                return (
                                                    <div key = {innerIndex}>
                                                        {item.name}
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                    <div>
                                        Amount: {purchase.totalAmount}
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
                                        Date Of Purchase: {purchase.dateOfPurchase}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div>
                            </div>
                    )
                }
            </div>
        );
    }
}

export default PurchaseHistory;