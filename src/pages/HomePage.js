import React, { Fragment } from 'react'
import Header from '../components/Header'
import HomeFeed from '../components/HomeFeed'
import { useEffect } from 'react'
import { getAllCategorys } from '../appHooks/categoryHook'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../appHooks/productHook'
import { getAllOrders } from '../appHooks/orderHook'
import AppPopOver from '../components/global/AppPopOver'
import { selectIsPrint, setisPrint } from '../app/slices/uiSlice'
import SalesReceipt from '../components/SalesReceipt'

const HomePage = () => {
    const dispatch = useDispatch()
    const isPrint = useSelector(selectIsPrint)
    useEffect(() => {
       
        getAllProducts(dispatch)
        getAllCategorys(dispatch)
        getAllOrders(dispatch)
        
    }, [])
    return (
        <Fragment>
            {
                <AppPopOver 
                    open={isPrint}
                    setOpen={() =>dispatch(setisPrint(false))}
                    
                    title='Sales Receipt'
                >
                    <SalesReceipt />
                </AppPopOver>
            }
            <div className="bg-gray-100 h-screen">
                <Header /> 
                <HomeFeed />
            </div>
        </Fragment>
        
    )
}

export default HomePage
