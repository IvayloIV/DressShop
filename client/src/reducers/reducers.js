import { registerReducer, loginReducer } from './authReducer';
import { dressReducer } from './dressReducer';
import { categoryReducer } from './categoryReducer';
import { commentReducer } from './commentReducer';
import { profileReducer } from './profileReducer';
import { usersReducer } from './usersReducer';

export default {
    register: registerReducer,
    login: loginReducer,
    dress: dressReducer,
    categories: categoryReducer,
    comments: commentReducer,
    profile: profileReducer,
    users: usersReducer
};