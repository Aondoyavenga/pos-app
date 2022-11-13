import axios from 'axios'
import { setCategorys, setSubCategorys } from '../app/slices/categorySlice'
import { setError, setIsLoading, setSuccess } from "../app/slices/uiSlice"

export const getAllCategorys = async (dispatch) => {
    try {
        const { data, status } = await axios.get('/category')
        if(status == 200) return dispatch(setCategorys(data))
        dispatch(setError(data.message))
    } catch (error) {
        if(error) return dispatch(setError(error.response?.data?.message))
    }
}

export const getAllSubCategorys = async (dispatch) => {
    try {
        const { data, status } = await axios.get('/subcategory')
        if(status == 200) return dispatch(setSubCategorys(data))
        dispatch(setError(data.message))
    } catch (error) {
        if(error) return dispatch(setError(error.response?.data?.message))
    }
}

export const addCategory = async (url, body, dispatch) => {
    try {
        dispatch(setIsLoading(true))
        const { data, status } = await axios.post(url, body)
        if(status == 201) {
            dispatch(setSuccess(data.message))
            dispatch(setIsLoading(false))
            setTimeout(() => {dispatch(setSuccess(null))}, 7000)
        }
    } catch (error) {
        dispatch(setIsLoading(false))
        setTimeout(() => {dispatch(setError(null))}, 7000)
        if(error) return dispatch(setError(error.response?.data?.message))
    }
}