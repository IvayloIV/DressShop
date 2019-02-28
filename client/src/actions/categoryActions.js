import { toast } from 'react-toastify';
import { GET_CATEGORIES_SUCCESS } from './actionTypes';
import { createCategory, getAllCategories } from '../api/remote';

function getCategoriesSuccess(data) {
    return {
        type: GET_CATEGORIES_SUCCESS,
        data
    };
}

function getCategoriesAction() {
    return (dispatch) => {
        return getAllCategories()
            .then(json => {
                if (json.success) {
                    dispatch(getCategoriesSuccess(json.categories));
                }

                return json;
            });
    };
}

function createCategoryAction(name) {
    return (dispatch) => {
        return createCategory(name)
            .then(json => {
                if (json.success) {
                    toast.success(json.message);
                } else {
                    toast.error(json.message);
                }

                return json;
            });
    };
}

export { createCategoryAction, getCategoriesAction };