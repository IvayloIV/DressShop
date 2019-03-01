import { GET_DRESS_SUCCESS, LIKE_DRESS_SUCCESS, DISLIKE_DRESS_SUCCESS } from '../actions/actionTypes';

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
        default:
            return state;
    }
}