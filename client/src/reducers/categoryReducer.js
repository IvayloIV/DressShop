import { GET_CATEGORIES_SUCCESS } from '../actions/actionTypes';

export function categoryReducer(state = [], action) {
    switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
        return action.data;
    default:
        return state;
    }
}