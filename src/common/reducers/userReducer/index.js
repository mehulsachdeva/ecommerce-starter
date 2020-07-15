import * as types from '../../types';

const initialState = {
    user: {}
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.GET_USER_LOGGED_IN_DETAILS:
            return {
                ...state,
                user: action.data
            };
        case types.RESET_USER_STATE:
            return initialState;
        default:
            return state;
    }
}