import api from '../utils/api';
import { todoActions } from '../slices/todo-slice';

// Fetch all todos of current user
export const fetchTodos = () => {
    return async (dispatch) => {
        try {
            const res = await api.get('/todos');
            dispatch(todoActions.fetchSuccess(res.data));
        } catch(err) {
            dispatch(
                todoActions.fetchFailure({ 
                    msg: err.response.statusText, 
                    status: err.response.status 
                })
            );
        }
    };
};

// Add a new todo for current user
export const addTodo = (text, date, time) => {
    const body = {text, date, time};

    return async (dispatch) => {
        try {
            const res = await api.post('/todos', body);
            if(res.status === 201) dispatch(fetchTodos());
        } catch(err) {
            dispatch(
                todoActions.fetchFailure({ 
                    msg: err.response.statusText, 
                    status: err.response.status 
                })
            );
        }
    };
};

// complete all todos at a date
export const updateAllTodos = (date) => {
    return async (dispatch) => {
        try {
            const res = await api.patch(`/todos/${date}`);
            if(res.status === 200) dispatch(fetchTodos());
        } catch(err) {
            dispatch(
                todoActions.fetchFailure({ 
                    msg: err.response.statusText, 
                    status: err.response.status 
                })
            );
        }
    };
};

// Toggle complete field of a todo
export const updateSingleTodo = (id) => {
    return async (dispatch) => {
        try {
            const res = await api.patch(`/todos/todo/${id}`);
            if(res.status === 200) dispatch(fetchTodos());
        } catch(err) {
            dispatch(
                todoActions.fetchFailure({ 
                    msg: err.response.statusText, 
                    status: err.response.status 
                })
            );
        }
        
    };
};

// Delete all todos at a date
export const deleteAllTodos = (date) => {
    return async (dispatch) => {
        try {
            const res = await api.delete(`/todos/${date}`);
            if(res.status === 200) dispatch(fetchTodos());
        } catch(err) {
            dispatch(
                todoActions.fetchFailure({ 
                    msg: err.response.statusText, 
                    status: err.response.status 
                })
            );
        }
    };
};

// Delete a single todo
export const deleteSingleTodo = (id) => {
    return async (dispatch) => {
        try {
            const res = await api.delete(`/todos/todo/${id}`);
            if(res.status === 200) dispatch(fetchTodos());
        } catch(err) {
            dispatch(
                todoActions.fetchFailure({ 
                    msg: err.response.statusText, 
                    status: err.response.status 
                })
            );
        }
    };
};