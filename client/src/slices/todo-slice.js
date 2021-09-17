import { createSlice } from "@reduxjs/toolkit";

import currentDate from '../utils/currentDate';

const todoSlice = createSlice({
    name: 'todo', 
    initialState: {
        todos: [],
        filter: 'all',
        clickedDate: currentDate(),
        error: null
    },
    reducers: {
        fetchSuccess(state, action) {
            state.todos = action.payload.todos;
        },
        fetchFailure(state, action) {
            state.error = action.payload;
        },
        setFilter(state, action) {
            state.filter = action.payload.filter;
        },
        setDate(state, action) {
            state.clickedDate = action.payload.date;
        }
    }
});

export const todoActions = todoSlice.actions;
export default todoSlice.reducer;