import api from '../utils/api';
import { authActions } from '../slices/auth-slice';
import { fetchTodos } from './todos';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => {
    return async (dispatch) => {
        setAuthToken(localStorage.token);

        try {
            dispatch(authActions.pending());
            const res = await api.get('/users');
            dispatch(fetchTodos());
            dispatch(authActions.userLoaded(res.data));
        } catch(err) {
            console.log(err);
            dispatch(authActions.loadFail());
        }
    };
};

// SignUp user
export const signUp = (name, email, password) => {
    const body = {name, email, password};

    return async(dispatch) => {
        try {
            dispatch(authActions.pending());
            const res = await api.post('/users', body);
            dispatch(authActions.authSuccess(res.data));
            dispatch(loadUser());
        } catch(err) {
            dispatch(authActions.authError(err.response.data));
        }
        
    };
};

// Login user
export const login = (email, password) => {
    const body = {email, password};

    return async (dispatch) => {
        try {
            dispatch(authActions.pending());
            const res = await api.post('/users/login', body);
            dispatch(authActions.authSuccess(res.data));
            dispatch(loadUser());
        } catch(err) {
            dispatch(authActions.authError(err.response.data));
        }
    };
};
