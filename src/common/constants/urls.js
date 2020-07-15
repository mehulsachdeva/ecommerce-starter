const DOMAIN = "http://localhost:8083/service";

//Client
export const LOGIN_USER = `${DOMAIN}/login`;
export const REGISTER_USER = `${DOMAIN}/register`;
export const CHECK_EMAIL_ALREADY_REGISTERED = `${DOMAIN}/check`;

export const FETCH_PRODUCTS = `${DOMAIN}/products`;
export const FETCH_PRODUCT_BY_ID = `${DOMAIN}/product`;

export const UPDATE_SHIPPING_DETAILS = `${DOMAIN}/api/shipping/update`;
export const FETCH_SHIPPING_DETAILS = `${DOMAIN}/api/shipping/fetch`;

export const MAKE_PURCHASE = `${DOMAIN}/purchase`;

export const FETCH_PURCHASE_HISTORY_BY_ID = `${DOMAIN}/api/purchase/history`;


//Admin
export const ADD_PRODUCT = `${DOMAIN}/products/store`;
export const UPDATE_PRODUCT = `${DOMAIN}/products/update`;
export const FETCH_ALL_PURCHASES = `${DOMAIN}/api/purchases`;