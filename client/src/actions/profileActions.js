import { GET_PROFILE_SUCCESS } from './actionTypes';
import { profile } from '../api/remote';

function getProfileSuccess(data) {
    return {
        type: GET_PROFILE_SUCCESS,
        data
    };
}

function getProfileAction(username) {
    return (dispatch) => {
        return profile(username)
            .then(json => {
                if (json.success) {
                    dispatch(getProfileSuccess(json.user));
                }

                return json;
            });
    };
}


export { getProfileAction };