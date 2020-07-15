import React, { Component } from 'react';

class Pagination extends Component {

    setCurrentPage = (page) => {
        this.props.setCurrentPage(page);
    }

    render() {

        const { totalPages } = this.props;
        const pageBoxes = [];

        for(let i = 1; i <= totalPages; i++) {
            pageBoxes.push(
                <button 
                    key = {i}
                    onClick = {() => this.setCurrentPage(i - 1)}
                >
                    {i}
                </button>
            )
        }

        return (
            <div>
                {pageBoxes}
            </div>
        );
    }
}

export default Pagination;