import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items: [],
    item: null
}

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        setCustomers: (state, action) => {
            state.items = action.payload
        },
        setSelectedCustomer: (state, action) => {
            state.item = action.payload
        }
    }
})

export const { setCustomers, setSelectedCustomer } = customerSlice.actions

export const selectCustomers = state => state.customer.items
export const selectSelectedCustomer = state => state.customer.item

export default customerSlice.reducer