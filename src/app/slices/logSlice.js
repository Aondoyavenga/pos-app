import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    items: [],
    error: null,
    item: null,
}


export const logSlice = createSlice({
    name: 'logs',
    initialState,
    reducers: {
        setLogs: (state, action) =>{
            console.log(action.payload)
            state.items = action.payload
        },
        setSelectLog: (state, action) =>{
            state.item = action.payload
        }
       
    },
    
})


export const { setLogs, setSelectLog } = logSlice.actions;
export const selectLogs = (state) => state.logs.items;
export const selectLog = (state) => state.logs.item;


export default logSlice.reducer