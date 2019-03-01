import { toast } from 'react-toastify';
import { GET_DRESS_SUCCESS, LIKE_DRESS_SUCCESS, DISLIKE_DRESS_SUCCESS } from './actionTypes';
import { getDressByPage, createDress, editDress, detailsDress, removeDress, likeDress, dislikeDress } from '../api/remote';

function getDressSuccess(data) {
    return {
        type: GET_DRESS_SUCCESS,
        data
    };
}

function likeDressSuccess(id) {
    return {
        type: LIKE_DRESS_SUCCESS,
        id
    };
}

function dislikeDressSuccess(id) {
    return {
        type: DISLIKE_DRESS_SUCCESS,
        id
    };
}

function getDressAction(page, count) {
    return (dispatch) => {
        return getDressByPage(page,count)
            .then(json => {
                if (json.success) {
                    dispatch(getDressSuccess(json.dress));
                }

                return json;
            });
    };
}

function createDressAction(category, cost, name, imageUrl, size, description) {
    return (dispatch) => {
        return createDress(category, cost, name, imageUrl, size, description)
            .then(json => {
                showMessage(json);
                return json;
            });
    };
}

function editDressAction(id, category, cost, name, imageUrl, size, description) {
    return (dispatch) => {
        return editDress(id, category, cost, name, imageUrl, size, description)
            .then(json => {
                showMessage(json);
                return json;
            });
    };
}

function detailsDressAction(id) {
    return (dispatch) => {
        return detailsDress(id)
            .then(json => {
                if (json.success) {
                    dispatch(getDressSuccess([json.dress]));
                }

                return json;
            });
    };
}

function removeDressAction(id) {
    return (dispatch) => {
        return removeDress(id)
            .then(json => {
                if (json.success) {
                    toast.success(json.message);
                } else {
                    toast.error(json.error);
                }

                return json;
            });
    };
}

function likeDressAction(dressId, userId) {
    return (dispatch) => {
        return likeDress(dressId)
            .then(json => {
                if (json.success) {
                    toast.success(json.message);
                    dispatch(likeDressSuccess(userId));
                } else {
                    toast.error(json.message);
                }

                return json;
            });
    };
}

function dislikeDressAction(dressId, userId) {
    return (dispatch) => {
        return dislikeDress(dressId)
            .then(json => {
                if (json.success) {
                    toast.success(json.message);
                    dispatch(dislikeDressSuccess(userId));
                } else {
                    toast.error(json.message);
                }

                return json;
            });
    };
}


function showMessage(json) {
    if (json.success) {
        toast.success(json.message);
    } else if (json.errors){
        for (let error of json.errors) {
            toast.error(error);
        }
    } else {
        toast.error(json.message);
    }
}

export { getDressAction, createDressAction, editDressAction, detailsDressAction, 
    removeDressAction, likeDressAction, dislikeDressAction };