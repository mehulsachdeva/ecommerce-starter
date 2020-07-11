const DOMAIN = "http://localhost:8083/service";

//Client
export const LOGIN_USER = `${DOMAIN}/login`;
export const REGISTER_USER = `${DOMAIN}/register`;
export const CHECK_EMAIL_ALREADY_REGISTERED = `${DOMAIN}/check`;

export const UPDATE_SHIPPING_DETAILS = `${DOMAIN}/api/shipping/update`;
export const FETCH_SHIPPING_DETAILS = `${DOMAIN}/api/shipping/fetch`;