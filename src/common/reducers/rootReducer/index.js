import { combineReducers } from 'redux';
import { cartReducer } from '../cartReducer';
import { userReducer } from '../userReducer';
import { shippingReducer } from '../shippingReducer';

export const rootReducer = combineReducers({
    userLoggedInInfo: userReducer,
    cartInfo: cartReducer,
    shippingInfo: shippingReducer
}) 