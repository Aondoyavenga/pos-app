import axios from "axios"
import { setCustomers } from "../app/slices/customerSlice"
import { setError, setIsLoading, setSuccess } from "../app/slices/uiSlice"

export const getAllCustomers = async (dispatch) => {
    try {
       
        const { data, status } = await axios.get('/customer')
        if(status == 200) return dispatch(setCustomers(data))
        dispatch(setError(data.message))
    } catch (error) {
        if(error) return dispatch(setError(error.response?.data?.message))
    }
}


export const addCustomer = async(body, dispatch, setBody, setOpen) => {
    try {
        dispatch(setIsLoading(true))
        const { data, status } = await axios.post('/customer', body)
        if(status == 201) return(
            dispatch(setIsLoading(true)),
            dispatch(setSuccess(data.message)),
            setBody({
                _id: '',
                action: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
              
            }),
            setOpen(true),
            getAllCustomers(dispatch),
            dispatch(setIsLoading(false))
        )
        dispatch(setError(data.message))
        dispatch(setIsLoading(false))

    } catch (error) {
        if(error) return dispatch(setError(error?.response?.data?.message))
    }
}