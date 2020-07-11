import * as types from '../types';

export const getUserLoggedInDetails = (data) => {
    return {
        type: types.GET_USER_LOGGED_IN_DETAILS,
        data
    }
}

export const addProductToCart = (data) => {
    return {
        type: types.ADD_PRODUCT_TO_CART,
        data
    }
}

export const removeProductFromCart = (data) => {
    return {
        type: types.REMOVE_PRODUCT_FROM_CART,
        data
    }
}

export const resetCartState = () => {
    return {
        type: types.RESET_CART_STATE
    }
}