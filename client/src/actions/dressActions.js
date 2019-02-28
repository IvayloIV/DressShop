import { toast } from 'react-toastify';
import { GET_DRESS_SUCCESS } from './actionTypes';
import { getDressByPage } from '../api/remote';

function getDressSuccess(data) {
    return {
        type: GET_DRESS_SUCCESS,
        data
    };
}

function getDressAction(page, count) {
    return (dispatch) => {
        return getDressByPage(page,count)
            .then(json => {
                if (json.success) {
                    dispatch(getDressSuccess(json.dress));
                }

                return json;
            });
    };
}

export { getDressAction };