import React, { Component } from 'react';
import { FILTER_BY_PRICE_MENU_OPTIONS } from '../constants';

class FilterProductList extends Component {

    filterProductName = (e) => {
        this.props.setFilterProductName(e.target.value);
    }

    filterPriceRange = (e) => {
        const priceArray = e.target.value.split("-");
        this.props.setFilterPriceRange(priceArray[0], priceArray[1]);
    }

    resetFilter = (e) => {
        e.preventDefault();
        this.props.setResetFilter();
    }

    render() {
        return (
            <form>
                <div>
                    <input 
                        type = "text"
                        placeholder = "Product Name"
                        onChange = {this.filterProductName}
                    />
                </div>
                <div>
                    <select onChange = {this.filterPriceRange}>
                    {
                        FILTER_BY_PRICE_MENU_OPTIONS.map((range, index) => {
                            return (
                                <option key = {index} value = {`${range.min}-${range.max}`}>
                                    {range.text}
                                </option>
                            );
                        })
                    }
                    </select>
                </div>
                <div>
                    <button
                        onClick = {this.resetFilter}
                    >
                        RESET
                    </button>
                </div>
            </form>
        );
    }
}

export default FilterProductList;