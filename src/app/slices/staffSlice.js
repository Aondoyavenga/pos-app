import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items: [],
    item: null
}

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        setStaffs: (state, action) => {
            state.items = action.payload
        },
        setSelectedStaff: (state, action) => {
            state.item = action.payload
        }
    }
})


export const { setStaffs, setSelectedStaff } = staffSlice.actions

export const selectStaffs = state => state.staff.items
export const selectSelectedStaff = state => state.staff.item 

export default staffSlice.reducer