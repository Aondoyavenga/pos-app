import React, { Fragment } from 'react'
import Header from '../../components/Header'
import { useSelector } from 'react-redux'
import { selectIsLoading, selectIsPrint, setisPrint } from '../../app/slices/uiSlice'
import AppPopOver from '../../components/global/AppPopOver'
import SalesReceipt from '../../components/SalesReceipt'
import { useDispatch } from 'react-redux'
import DrawerMenu from '../../components/DrawerMenu'
import { useState } from 'react'
import { getClosedSalesRecord } from '../../appHooks/orderHook'
import { SearchIcon } from '@heroicons/react/outline'
import { IconButton } from '@mui/material'
import { selectClosedSales, selectDrawer, setDrawer } from '../../app/slices/orderSlice'
import DrawerDetails from '../../components/global/DrawerDetails'

const Counter = () => {
    const dispatch = useDispatch()
    const isPrint = useSelector(selectIsPrint)
    const drawer = useSelector(selectDrawer)
    const isLoading = useSelector(selectIsLoading)
    const closeSales = useSelector(selectClosedSales)
    const [date, setDate] = useState({
        startDate: '',
        endDate: ''
    })

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
            
            <main className='grid grid-cols-1 md:grid-cols-2
                md: max-w-3xl xl:grid-cols-7 xl:max-w-full mx-auto shadow-md px-0 h-full overflow-hidden'>
                <div className='hidden xl:inline-grid col-span-1 overflow-auto scrollbar-none px-0 h-full bg-white'
                >
                    <DrawerMenu />
                    {/* <PostingAnalysis /> */}
                </div>
            
                <section className="col-span-6 overflow-y-auto pb-20 h-[100%] overflow-auto scrollbar-none">
                   <div className='flex w-[40%] mx-auto py-4 justify-between'>
                        <div>
                            <input 
                                type="date" name="" id=""
                                onChange={e =>setDate({
                                    ...date,
                                    startDate: e.target.value
                                })}
                                className='outline-none border-0 focus:ring-0 shadow-sm rounded-md'
                            />
                        </div>
                        <div>
                            <input 
                                type="date" name="" id="" 
                                onChange={e =>setDate({
                                    ...date,
                                    endDate: e.target.value
                                })}
                                className='outline-none border-0 focus:ring-0 shadow-sm rounded-md'
                            />
                        </div>
                        <div className='flex items-center'>
                            <IconButton
                                onClick={() =>getClosedSalesRecord(dispatch, date.startDate, date.endDate)}
                            >
                                <SearchIcon className='w-6' />
                            </IconButton>
                        </div>
                   </div>
                   <div className='flex'>
                        { closeSales?.length > 0 && !isLoading ?
                        <Fragment>
                            <div className='flex-[0.6] pl-2 sticky z-10 overflow-y-auto'>
                                <table className='w-full'>
                                    <th>#ID</th>
                                    <th>Close By</th>
                                    <th>Date</th>
                                    <tbody>
                                        {
                                            closeSales?.map(item => {
                                                const {_id, closeID, createdAt, userRef: {firstName, lastName}} = item
                                                return (
                                                    <Fragment
                                                        key={_id}
                                                    >
                                                        <tr
                                                            onClick={() =>dispatch(setDrawer(item))}
                                                            className='cursor-pointer hover:text-pos_color-green'
                                                        >
                                                            <td> {closeID} </td>
                                                            <td> {`${firstName} ${lastName}`} </td>
                                                            <td> {new Date(createdAt).toLocaleString()} </td>
                                                        </tr>
                                                    </Fragment>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            
                            </div>
                        
                            <div className="flex-1 border-l-[1.5px]">
                                {
                                    drawer &&
                                    <DrawerDetails counter />
                                }
                            </div>
                        </Fragment>
                        :
                        <div className='w-full flex items-center justify-center flex-row'>
                            <p className='text-red-500 font-semibold text-xl'>Ops !!! no record available</p>
                        </div>
                        }
                   </div>
                </section>
            </main>
        </div>
      </Fragment>
        
    )
}

export default Counter
