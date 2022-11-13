import React from 'react'
import Header from '../components/Header'
import StaffFeed from '../components/StaffFeed'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllStaffs } from '../appHooks/staffHook'

const Staff = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        getAllStaffs(dispatch)
        
    }, [])
    return (
        <div className="bg-gray-100 h-screen">
            <Header /> 
            <StaffFeed />
        </div>
    )
}

export default Staff
