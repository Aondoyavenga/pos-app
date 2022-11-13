import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items: [],
    item: null,
    drawer: null,
    callover: [],
    receipt: null,
    printData: [],
    orderItems: [],
    totalSummary: null,
    closedSales: []
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrders: (state, action) => {
            state.items = action.payload
        },
        setSelectedOrder: (state, action) => {
            state.item = action.payload
        },
        setTotalSummary: (state, action) => {
            state.totalSummary = action.payload
        },
        setOrderItems: (state, action) => {
            state.orderItems = action.payload
        },
        setCalloverOrder: (state,action) => {
            state.callover = action.payload
        },
        setVoucher: (state, action) => {
            state.receipt = action.payload
        },
        setPrintData: (state, action) => {
            state.printData = action.payload
        },
        setDrawer: (state, action) => {
            state.drawer = action.payload
        },
        setClosedSales: (state, action) => {
            state.closedSales = action.payload
        }

    }
})

export const { 
    setOrders, 
    setDrawer,
    setVoucher,
    setPrintData,
    setOrderItems,
    setTotalSummary,
    setSelectedOrder, 
    setCalloverOrder,
    setClosedSales
} = orderSlice.actions

export const selectOrders = state => state.order.items 
export const selectDrawer = state => state.order.drawer
export const selectVoucher = state => state.order.receipt
export const selectPrinData = state => state.order.printData
export const selectSelectedOrder = state => state.order.item
export const selectOrderItems = state => state.order.orderItems
export const selectCalloverOrder = state => state.order.callover
export const selectClosedSales = state => state.order.closedSales
export const selectTotalSummary = state => state.order.totalSummary

export default orderSlice.reducer