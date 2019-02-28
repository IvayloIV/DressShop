import { GET_DRESS_SUCCESS } from '../actions/actionTypes';

export function dressReducer(state = [], action) {
    switch (action.type) {
    case GET_DRESS_SUCCESS:
        return action.data;
    default:
        return state;
    }
}