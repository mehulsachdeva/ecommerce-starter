import * as types from '../types';

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