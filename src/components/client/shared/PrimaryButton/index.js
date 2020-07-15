import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PrimaryButton extends Component {
    render() {

        const { 
            link,
            styling, 
            text, 
            action,
            redirectTo,
            props
        } = this.props;

        return (
            <div>
                {
                    link ? (
                        <Link to = {{
                            pathname: redirectTo,
                            state: {
                                props
                            }
                        }}>
                            <div
                                style = {{ styling }}
                            >
                                {text}
                            </div>
                        </Link>
                    ) : (
                        <div
                            onClick = {action}
                        >
                            {text}
                        </div>
                    )
                }
            </div>
        );
    }
}

export default PrimaryButton;