import React from 'react'
import Header from '../../components/Header'
import Feed from '../../components/Feed'
import { useEffect } from 'react'
import { getAllCategorys } from '../../appHooks/categoryHook'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../appHooks/productHook'
import { getAllOrders } from '../../appHooks/orderHook'
import { selectSuccess } from '../../app/slices/uiSlice'
import { selectUser } from '../../app/slices/userSlice'

const Dashboard = () => {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const success = useSelector(selectSuccess)
    useEffect(() => {
      
        getAllProducts(dispatch)
        getAllCategorys(dispatch)
        getAllOrders(dispatch)
        
    }, [success, user])
    return (
        <div className="bg-gray-100 h-screen">
            <Header /> 
            <Feed />
        </div>
    )
}

export default Dashboard
