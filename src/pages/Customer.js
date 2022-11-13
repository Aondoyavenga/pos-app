import React from 'react'
import Header from '../components/Header'
import CustomerFeed from '../components/CustomerFeed'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCustomers } from '../appHooks/customerHook'
import { selectSuccess } from '../app/slices/uiSlice'

const Customer = () => {
    const dispatch = useDispatch()
    const success = useSelector(selectSuccess)
      
    useEffect(() => {
       function getCus () {
          getAllCustomers(dispatch)
       }
       getCus()
    }, [success])
    return (
        <div className="bg-gray-100 h-screen">
            <Header /> 
            <CustomerFeed />
        </div>
    )
}


export default Customer
