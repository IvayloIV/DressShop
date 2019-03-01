import { GET_COMMENTS_SUCCESS, CREATE_COMMENT_SUCCESS, REMOVE_COMMENT_SUCCESS } from '../actions/actionTypes';

export function commentReducer(state = [], action) {
    switch (action.type) {
        case GET_COMMENTS_SUCCESS:
            return action.data;
        case CREATE_COMMENT_SUCCESS:
            state.unshift(action.data);
            return state.slice();
        case REMOVE_COMMENT_SUCCESS:
            return state.filter(a => a._id !== action.id);
        default:
            return state;
    }
}