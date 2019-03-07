import { GET_USERS_SUCCESS, BLOCK_USER_SUCCESS, UNBLOCK_USER_SUCCESS } from './actionTypes';
import { getUsers, blockUser, unblockUser } from '../api/remote';
import showMessage from './messageHandler';

function getUsersSuccess(data) {
    return {
        type: GET_USERS_SUCCESS,
        data
    };
}

function blockUserSuccess(id) {
    return {
        type: BLOCK_USER_SUCCESS,
        id
    };
}

function unblockUserSuccess(id) {
    return {
        type: UNBLOCK_USER_SUCCESS,
        id
    };
}

function getUsersAction() {
    return (dispatch) => {
        return getUsers()
            .then(json => {
                if (json.success) {
                    dispatch(getUsersSuccess(json.users));
                }

                return json;
            });
    };
}

function blockUserAction(userId) {
    return (dispatch) => {
        return blockUser(userId)
            .then(json => {
                showMessage(json);
                if (json.success) {
                    dispatch(blockUserSuccess(userId));
                }

                return json;
            });
    };
}

function unblockUserAction(userId) {
    return (dispatch) => {
        return unblockUser(userId)
            .then(json => {
                showMessage(json);
                if (json.success) {
                    dispatch(unblockUserSuccess(userId));
                }

                return json;
            });
    };
}

export { getUsersAction, blockUserAction, unblockUserAction };