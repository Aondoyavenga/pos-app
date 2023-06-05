import axios from 'axios'
import { setCategorys, setSubCategorys } from '../app/slices/categorySlice'
import { setPagenetProducts, setProductOrderList, setProducts } from "../app/slices/productSlice"
import { setError } from "../app/slices/uiSlice"

export const getAllProducts = async (dispatch, page, limit) => {
    try {
        dispatch(setProducts(null))
        if(!page) {
            const { data, status } = await axios.get('/product')
            if(status == 200) return dispatch(setProducts(data))
            return dispatch(setError(data.message))
        }
        const { data, status } = await axios.get(`/product/${page}/${limit}`)
        if(status == 200) return dispatch(setPagenetProducts(data))
        dispatch(setError(data.message))
    } catch (error) {
        dispatch(setPagenetProducts(null))
        dispatch(setProducts(null))

        // if(error) return dispatch(setError(error.response?.data?.message))
    }
}


export const searchProducts = async (dispatch, query, setIsLoading, setSearchResult) => {
    try {
        if(!query?.length > 3) return
        setSearchResult(null)
        setIsLoading(true)
        const { data, status } = await axios.get(`/product/search/${query}`)
       
        setIsLoading(false)
        if(status == 200) return setSearchResult(data)
        return dispatch(setError(data.message))
       
    } catch (error) {
        setIsLoading(false)
        setSearchResult(null)

        // if(error) return dispatch(setError(error.response?.data?.message))
    }
}

export const getCategories = async (dispatch) => {
    try {
        const {data} = await axios.get('/category')
        dispatch(setCategorys(data))

    } catch (error) {
        dispatch(setCategorys([]))
    }
}

export const getSubCategories = async (dispatch) => {
    try {
        const {data} = await axios.get('/subcategory')
        dispatch(setSubCategorys(data))

    } catch (error) {
        dispatch(setCategorys([]))
    }
}

export const getProductOrderList = async (dispatch, category, subCategory) => {
    try {
        dispatch(setProductOrderList(null))
       
        const { data, status } = await axios.post(`/product/order`, {category, subCategory})
        if(status == 200) return dispatch(setProductOrderList(data))
        dispatch(setError(data.message))
    } catch (error) {
        dispatch(setProductOrderList(null))

    }
}