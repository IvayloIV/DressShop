import { GET_USERS_SUCCESS, BLOCK_USER_SUCCESS, UNBLOCK_USER_SUCCESS } from '../actions/actionTypes';

export function usersReducer(state = [], action) {
    switch (action.type) {
        case GET_USERS_SUCCESS:
            return action.data;
        case BLOCK_USER_SUCCESS:
            const unBlockedIndex = state.findIndex(a => a._id === action.id);
            state[unBlockedIndex].blocked = true;
            return state.slice();
        case UNBLOCK_USER_SUCCESS:
            const blockedIndex = state.findIndex(a => a._id === action.id);
            state[blockedIndex].blocked = false;
            return state.slice();
        default:
            return state;
    }
}