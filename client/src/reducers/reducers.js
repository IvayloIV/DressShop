import { registerReducer, loginReducer } from './authReducer';
import { dressReducer } from './dressReducer';
import { categoryReducer } from './categoryReducer';
import { commentReducer } from './commentReducer';

export default {
    register: registerReducer,
    login: loginReducer,
    dress: dressReducer,
    categories: categoryReducer,
    comments: commentReducer
};