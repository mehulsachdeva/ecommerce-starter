import * as types from '../../types';

const initialState = {
    cart: []
}

export const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.ADD_PRODUCT_TO_CART:
            return {
                ...state,
                cart: [
                    ...state.cart,
                    action.data
                ]
            };
        case types.REMOVE_PRODUCT_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter((item) => item.productId !== action.data)
            };
        case types.RESET_CART_STATE:
            return initialState;
        default:
            return state;
    }
}