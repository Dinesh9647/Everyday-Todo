import { createSlice } from '@reduxjs/toolkit';
import setAuthToken from '../utils/setAuthToken';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token'), 
        isAuthenticated: false,
        loading: false,
        user: null,
        error: null
    },
    reducers: {
        pending(state) {
            state.loading = true;
        },
        authSuccess(state, action) {
            localStorage.setItem('token', action.payload.token);
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        userLoaded(state, action) {
            state.isAuthenticated = true;
            state.loading = false;
            state.user = action.payload;
        },
        setError(state, action) {
            state.error = action.payload.error;
        },
        authError(state, action) {
            localStorage.removeItem('token');
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.user = null;
            state.error = action.payload.error;
        },
        loadFail(state) {
            localStorage.removeItem('token');
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.user = null;
        },
        removeError(state) {
            state.error = null;
        },
        logout(state) {
            localStorage.removeItem('token');
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.user = null;
            setAuthToken(state.token);
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;