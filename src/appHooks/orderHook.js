import axios from "axios"
import { setCalloverOrder, setClosedSales, setDrawer, setOrderItems, setOrders, setSoldProducts, setVoucher } from "../app/slices/orderSlice"
import { setError, setIsDrawer, setIsLoading, setisPrint, setSuccess } from "../app/slices/uiSlice"

export const  getAllOrders = async(dispatch) =>  {
    try {
        const { data, status} = await axios.get('/orders')
        if(status == 200) return dispatch(setOrders(data))

    } catch (error) {
        return error
    }
}

export const  getCustomerOrders = async(orderId, dispatch) =>  {
    try {
        const { data, status} = await axios.get(`/orders/${orderId}`)
        if(status == 200) return dispatch(setOrders(data))

    } catch (error) {
        return error
    }
}

export const handleGetItems = async(orderId, dispatch, setOpen, order) => {
    try {
       
        const { data, status } = await axios.get(`/orders/items/${orderId}`)
        if(status ==200 && !order?.orderId) {
            dispatch(setOrderItems(data))
            return setOpen(true)
            
        }
        if(order?.orderId) return (
            // setOpen(false),
            dispatch(setCalloverOrder({
                order,
                orderItems: data
            }))
        )
        
        dispatch(setError(data.message)) 
    } catch (error) {
        dispatch(setError(error?.response?.data?.message)) 
    }
}

export const handleGetReceipt = async(orderId, dispatch, order) => {
    try {
       
        const { data, status } = await axios.get(`/orders/items/${orderId}`)
        if(status ==200 ) {
            const result = {
                order,
                orderItems: data
            }
            dispatch(setVoucher(result))
            dispatch(setisPrint(true))
        }
      
        dispatch(setError(data.message)) 
    } catch (error) {
        dispatch(setError(error?.response?.data?.message)) 
    }
}


export const handleDeleteOrder = async(orderId, dispatch) => {
    try {
       
        const { data, status } = await axios.delete(`/orders/${orderId}`)
        
        if(status == 201) return (
            dispatch(setSuccess(data.message)),
            alert(data.message)
        )
        dispatch(setError(data.message))
      
        
        dispatch(setError(data.message)) 
    } catch (error) {
        dispatch(setError(error?.response?.data?.message)) 
    }
}

export const getOrderReport = async (url, dispatch) =>{
    try {
        const {data, status} = await axios.get(url)
        if(status == 200) return dispatch(setOrders(data))
        dispatch(setError(data.message))
    } catch (error) {
        dispatch(setOrders([]))
    }
}


export const handleCloseSales = async (dispatch, body) => {
    try {
        dispatch(setIsLoading(true))
        if(!body)  {
            const { status, data } = await axios.get('/orders/close/sales')
            dispatch(setIsLoading(false))
            if(status == 200) return (dispatch(setDrawer(data)), dispatch(setIsDrawer(true)), dispatch(setIsLoading(false)))

            return dispatch(setError(data?.message))
        }
        const { status, data } = await axios.post('/orders/close/sales', body)
        if(status == 200) return (dispatch(setSuccess(data.message)), dispatch(setIsDrawer(false)), dispatch(setIsLoading(false)))
       
    } catch (error) {
        dispatch(setIsLoading(false))
        dispatch(setIsDrawer(false))
        dispatch(setError(error?.response?.data?.message))
    }
}

export const getClosedSalesRecord = async (dispatch, startDate, endDate) => {
    try {
        const { status, data } = await axios.get(`/orders/close/date/${startDate}/${endDate}`)
        if(status === 200) return dispatch(setClosedSales(data))
        
    } catch (error) {
        dispatch(setError(error?.response?.data?.message))
    }
}

export const getSoldProducts = async (dispatch, startDate, endDate, product) => {
    try {
        const { status, data } = await axios.get(`/orders/sold/date_product/${startDate}/${endDate}/${product?product:'no'}`)
        if(status === 200) return dispatch(setSoldProducts(data))
        
    } catch (error) {
        dispatch(setError(error?.response?.data?.message))
    }
}





