import axios from "axios"
import { setStaffs } from "../app/slices/staffSlice"
import { setError, setIsLoading, setSuccess } from "../app/slices/uiSlice"
import { setUser } from "../app/slices/userSlice"

export const getSession = async (dispatch, token) => {
    try {
        const { data, status } = await axios.get('/user/auth', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if(status == 200) return dispatch(setUser(data))
        dispatch(setError(data.message))
    } catch (error) {
        if(error) return dispatch(setError(error?.response?.data?.message))
    }
}

export const getAllStaffs = async (dispatch) => {
    try {
        const { data, status } = await axios.get('/user')
        if(status == 200) return dispatch(setStaffs(data))
        dispatch(setError(data.message))
    } catch (error) {
        if(error) return dispatch(setError(error?.response?.data?.message))
    }
}

export const addStaff = async(body, dispatch, setBody, setOpen) => {
    try {
        dispatch(setIsLoading(true))
        const { data, status } = await axios.post('/user', body)
        if(status == 201) return(
            dispatch(setIsLoading(true)),
            dispatch(setSuccess(data.message)),
            setBody({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                confirmPassword: '',
                role: {
                    staff: false,
                    trainee: false,
                    manager: false
                }
            }),
            setOpen(true),
            getAllStaffs(dispatch),
            dispatch(setIsLoading(false))

        )
        dispatch(setError(data.message))
        dispatch(setIsLoading(false))

    } catch (error) {
        if(error) return dispatch(setError(error?.response?.data?.message))
    }
}