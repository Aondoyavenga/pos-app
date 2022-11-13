import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    token: null,
    error: null,
    data: null
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action) =>{
           state.token = action.payload
        },
        setUser: (state, action) =>{
            state.data = action.payload
        },
    }
})


export const { setUser, setToken } = userSlice.actions;
export const selectUser = state => state.user.data
export const selectToken = (state) => state.user.token;

export default userSlice.reducer