import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/auth-slice';
import todoReducer from './slices/todo-slice';
import uiReducer from './slices/ui-slice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        todo: todoReducer,
        ui: uiReducer
    }
});

export default store;