import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './slices/basketSlice'
import userReducer from './slices/userSlice'
import logReducer from './slices/logSlice'
import todoReducer from './slices/todoSlice'
import uiReducer from './slices/uiSlice'
import orderReducer from './slices/orderSlice'
import staffReducer from './slices/staffSlice'
import productReducer from './slices/productSlice'
import categoryReducer from './slices/categorySlice'
import customerReducer from './slices/customerSlice'

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        logs: logReducer,
        user: userReducer,
        todo: todoReducer,
        order: orderReducer,
        staff: staffReducer,
        product: productReducer,
        category: categoryReducer,
        customer: customerReducer
    },
});