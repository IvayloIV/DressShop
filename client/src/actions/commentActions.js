import { GET_COMMENTS_SUCCESS ,CREATE_COMMENT_SUCCESS, REMOVE_COMMENT_SUCCESS } from './actionTypes';
import { getComments, createComment, removeComment } from '../api/remote';
import showMessage from './messageHandler';

function getCommentsSuccess(data) {
    return {
        type: GET_COMMENTS_SUCCESS,
        data
    };
}

function createCommentSuccess(data) {
    return {
        type: CREATE_COMMENT_SUCCESS,
        data
    };
}

function removeCommentSuccess(id) {
    return {
        type: REMOVE_COMMENT_SUCCESS,
        id
    };
}

function getCommentsAction(dressId) {
    return (dispatch) => {
        return getComments(dressId)
            .then(json => {
                if (json.success) {
                    dispatch(getCommentsSuccess(json.comments));
                }

                return json;
            });
    };
}

function createCommentAction(dressId, message, rating) {
    return (dispatch) => {
        return createComment(dressId, message, rating)
            .then(json => {
                showMessage(json);
                if (json.success) {
                    dispatch(createCommentSuccess(json.comment));
                }

                return json;
            });
    };
}

function removeCommentAction(dressId) {
    return (dispatch) => {
        return removeComment(dressId)
            .then(json => {
                showMessage(json);
                if (json.success) {
                    dispatch(removeCommentSuccess(dressId));
                }

                return json;
            });
    };
}

export { getCommentsAction, createCommentAction, removeCommentAction };