import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
const initialState = {
    items: [],
    item: null,
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        // actions
        setTodo: (state, action) =>{
            state.items = action.payload
        },
        setSelectTodo: (state, action) =>{
            state.item = action.payload
        }
    },
});

export const { setTodo, setSelectTodo } = todoSlice.actions
export const selectToDos = (state) => state.todo.items;
export const selectedTodo = (state) => state.todo.item;
export default todoSlice.reducer;