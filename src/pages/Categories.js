import React from 'react'
import Header from '../components/Header'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectSuccess } from '../app/slices/uiSlice'
import { getAllCategorys, getAllSubCategorys } from '../appHooks/categoryHook'
import CategoriesFeed from '../components/CategoriesFeed'

const Categories = () => {
    const dispatch = useDispatch()
    const success = useSelector(selectSuccess)
      
    useEffect(() => {
       function getCategory () {
          getAllCategorys(dispatch)
          getAllSubCategorys(dispatch)
       }
       getCategory()
    }, [success])
    return (
        <div className="bg-gray-100 h-screen">
            <Header /> 
            <CategoriesFeed />
        </div>
    )
}

export default Categories
