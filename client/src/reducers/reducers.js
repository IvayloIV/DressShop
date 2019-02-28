import { registerReducer, loginReducer } from './authReducer';
import { dressReducer } from './dressReducer';
import { categoryReducer } from './categoryReducer';

export default {
    register: registerReducer,
    login: loginReducer,
    dress: dressReducer,
    categories: categoryReducer
};