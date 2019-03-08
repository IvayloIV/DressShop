import { GET_DRESS_SUCCESS, LIKE_DRESS_SUCCESS, DISLIKE_DRESS_SUCCESS, 
    REMOVE_FROM_CART_SUCCESS, CREATE_COMMENT_SUCCESS, REMOVE_COMMENT_SUCCESS, 
    SORT_DRESS_SUCCESS } from '../actions/actionTypes';

export function dressReducer(state = [], action) {
    switch (action.type) {
        case GET_DRESS_SUCCESS:
            return action.data;
        case LIKE_DRESS_SUCCESS:
            state[0].likes.push(action.id);
            return state.slice();
        case DISLIKE_DRESS_SUCCESS:
            let index = state[0].likes.indexOf(action.id);
            state[0].likes.splice(index, 1);
            return state.slice();
        case REMOVE_FROM_CART_SUCCESS:
            return state.filter(a => a._id !== action.id);
        case CREATE_COMMENT_SUCCESS:
            state[0].comments.push(action.data);
            return state.slice();
        case REMOVE_COMMENT_SUCCESS:
            state[0].comments = state[0].comments.filter(c => c._id !== action.id);
            return state.slice();
        case SORT_DRESS_SUCCESS:
            const order = action.order;
            return state.sort((a, b) => (order === 1) ? a.cost - b.cost : b.cost - a.cost);
        default:
            return state;
    }
}