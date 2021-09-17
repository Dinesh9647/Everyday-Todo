import { createSlice } from "@reduxjs/toolkit"

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        showMenu: false,
        showDateList: false
    },
    reducers: {
        toggleMenu(state) {
            state.showMenu = !state.showMenu;
        },
        toggleDateList(state) {
            state.showDateList = !state.showDateList;
        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;