import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items: [],
    item: [],
    subcat: null,
    selected: null
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategorys: (state, action) => {
            state.items = action.payload
        },
        setSelectedCategory: (state, action) => {
            state.selected = action.payload
        },
        setSubCategorys: (state, action) => {
            state.item = action.payload
        },
        setSelectedSubcategory: (state, action) => {
            state.subcat = action.payload
        }
    }
})

export const { setCategorys, setSelectedCategory, setSelectedSubcategory, setSubCategorys } = categorySlice.actions

export const selectCategorys = state => state.category.items 
export const selectSubCategorys = state => state.category.item
export const selectSelectedCategory = state => state.category.selected
export const selectSelectedSubcategory = state => state.category.subcat

export default categorySlice.reducer