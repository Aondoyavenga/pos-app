import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    Error: null,
    success: null,
    isOpen: false,
    isLoading: false,
    isPrint: false,
    isDrawer: false

}

export const uiSlice = createSlice ({
    name: 'ui',
    initialState,
    reducers: {
        // actions
        setIsOpen: (state, action) =>{
            state.isOpen = action.payload
        },

        setError: (state, action) => {
            state.Error = action.payload
        },

        setSuccess: (state, action) => {
            state.success = action.payload
        },
        setisPrint: (state, action) =>{
            state.isPrint = action.payload
        },

        setIsLoading: (state, action) =>{
            state.isLoading = action.payload
        },

        setIsDrawer: (state, action) => {
            state.isDrawer = action.payload
        }
    },
})

export const { setError, setIsDrawer, setSuccess, setIsOpen, setisPrint, setIsLoading } = uiSlice.actions;

export const selectIsOpen = (state) => state.ui.isOpen;
export const selectError = state => state.ui.Error
export const selectSuccess = state => state.ui.success
export const selectIsPrint = state => state.ui.isPrint
export const selectIsDrawer = state => state.ui.isDrawer
export const selectIsLoading = (state) => state.ui.isLoading;


export default uiSlice.reducer;