import { GET_DRESS_SUCCESS, LIKE_DRESS_SUCCESS, DISLIKE_DRESS_SUCCESS, SORT_DRESS_SUCCESS } from './actionTypes';
import { getDressByPage, createDress, editDress, detailsDress, removeDress, likeDress, dislikeDress, getByCategory } from '../api/remote';
import showMessage from './messageHandler';

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

function sortDressSuccess(order) {
    return {
        type: SORT_DRESS_SUCCESS,
        order
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
                showMessage(json);
                return json;
            });
    };
}

function likeDressAction(dressId, userId) {
    return (dispatch) => {
        return likeDress(dressId)
            .then(json => {
                showMessage(json);
                if (json.success) {
                    dispatch(likeDressSuccess(userId));
                }

                return json;
            });
    };
}

function dislikeDressAction(dressId, userId) {
    return (dispatch) => {
        return dislikeDress(dressId)
            .then(json => {
                showMessage(json);
                if (json.success) {
                    dispatch(dislikeDressSuccess(userId));
                }

                return json;
            });
    };
}

function getDressByCategoryAction(categoryName) {
    return (dispatch) => {
        return getByCategory(categoryName)
            .then(json => {
                if (json.success) {
                    dispatch(getDressSuccess(json.dress));
                }

                return json;
            });
    };
}

function sortDressAction(order) {
    return (dispatch) => {
        dispatch(sortDressSuccess(order));
    };
}

export { getDressAction, createDressAction, editDressAction, detailsDressAction, 
    removeDressAction, likeDressAction, dislikeDressAction, getDressByCategoryAction,
    sortDressAction };