import * as types from '../../types';

const initialValues = {
    shippingDetails: {}
}

export const shippingReducer = (state = initialValues, action) => {
    switch(action.type) {
        case types.UPDATE_SHIPPING_DETAILS:
            return {
                ...state,
                shippingDetails: action.data
            };
        case types.RESET_SHIPPING_STATE:
            return initialValues;
        default:
            return state;
    }
}
