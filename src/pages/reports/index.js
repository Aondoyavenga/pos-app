import React, { Fragment } from 'react'
import Header from '../../components/Header'
import ReportFeed from '../../components/ReportFeed'
import { useSelector } from 'react-redux'
import { selectIsPrint, setisPrint } from '../../app/slices/uiSlice'
import AppPopOver from '../../components/global/AppPopOver'
import SalesReceipt from '../../components/SalesReceipt'
import { useDispatch } from 'react-redux'

const Reports = () => {
    const dispatch = useDispatch()
    const isPrint = useSelector(selectIsPrint)

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
            <ReportFeed />
        </div>
      </Fragment>
        
    )
}

export default Reports
