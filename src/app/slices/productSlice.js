
import {createSlice} from '@reduxjs/toolkit'
const initialState = {
    items: [],
    item: null,
    list: [],
    orderList: []
}

const productSlice = createSlice({
    name:'product',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.items = action.payload
        },
        setSelectedProduct: (state, action) => {
            state.item = action.payload
        },
        setPagenetProducts: (state, action) => {
            state.list = action.payload
        },
        setProductOrderList: (state, action) => {
            state.orderList = action.payload
        }
    }
})

export const { setProducts, setProductOrderList, setSelectedProduct, setPagenetProducts } = productSlice.actions

export const selectProducts = state => state.product.items 
export const selectSelectedProduct = state => state.product.item
export const selectProductList = state => state.product.list
export const selectProductOrderList = state => state.product.orderList

export default productSlice.reducer