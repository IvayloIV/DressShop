import { GET_PROFILE_SUCCESS } from '../actions/actionTypes';

export function profileReducer(state = {}, action) {
    switch (action.type) {
        case GET_PROFILE_SUCCESS:
            return action.data;
        default:
            return state;
    }
}