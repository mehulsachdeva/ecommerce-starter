import React, { Component } from 'react';
import { FILTER_BY_PRICE_MENU_OPTIONS, MIN_VALUE, MAX_VALUE } from '../constants';

class FilterProductList extends Component {

    state = {
        filterMenuOptions: FILTER_BY_PRICE_MENU_OPTIONS
    }

    filterProductName = (e) => {
        this.props.setFilterProductName(e.target.value);
    }

    filterPriceRange = (e) => {
        const priceArray = e.target.value.split("-");
        this.props.setFilterPriceRange(priceArray[0], priceArray[1]);
    }

    resetFilter = () => {
        this.props.setResetFilter();
    }

    render() {

        const { filterMenuOptions } = this.state;

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
                    <select 
                        onChange = {this.filterPriceRange}
                        defaultValue = {`${MIN_VALUE}-${MAX_VALUE}`}
                    >
                    {
                        filterMenuOptions.map((range, index) => {
                            return (
                                <option 
                                    key = {index} 
                                    value = {`${range.min}-${range.max}`}
                                >
                                    {range.text}
                                </option>
                            );
                        })
                    }
                    </select>
                </div>
                <div>
                    <input
                        type = "reset"
                        onClick = {this.resetFilter}
                        value = "RESET"
                    />
                </div>
            </form>
        );
    }
}

export default FilterProductList;