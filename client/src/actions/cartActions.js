import { toast } from 'react-toastify';
import { GET_DRESS_SUCCESS, REMOVE_FROM_CART_SUCCESS } from '../actions/actionTypes';
import { addToCart, getMyCart, removeFromCart, checkout } from '../api/remote';

function getDressSuccess(data) {
    return {
        type: GET_DRESS_SUCCESS,
        data
    };
}

function removeFromCartSuccess(id) {
    return {
        type: REMOVE_FROM_CART_SUCCESS,
        id
    };
}

function addToCartAction(id) {
    return (dispatch) => {
        return addToCart(id)
            .then(json => {
                if (json.success) {
                    toast.success(json.message);
                } else {
                    toast.error(json.message);
                }

                return json;
            });
    };
}

function getMyCartAction() {
    return (dispatch) => {
        return getMyCart()
            .then(json => {
                if (json.success) {
                    dispatch(getDressSuccess(json.cart));
                } else {
                    toast.error(json.message);
                }

                return json;
            });
    };
}

function removeFromCartAction(id) {
    return (dispatch) => {
        return removeFromCart(id)
            .then(json => {
                if (json.success) {
                    dispatch(removeFromCartSuccess(id));
                    toast.success(json.message);
                } else {
                    toast.error(json.message);
                }

                return json;
            });
    };
}

function checkoutAction() {
    return (dispatch) => {
        return checkout()
            .then(json => {
                if (json.success) {
                    toast.success(json.message);
                } else {
                    toast.error(json.message);
                }

                return json;
            });
    };
}

export { addToCartAction, getMyCartAction, removeFromCartAction, checkoutAction };