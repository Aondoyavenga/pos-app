import axios from 'axios'
import router from 'next/router'
import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrders } from '../app/slices/orderSlice'
import { setError } from '../app/slices/uiSlice'
import DrawerMenu from './DrawerMenu'
import OrderList from './OrderList'
import PostingAnalysis from './PostingAnalysis'
import PostTicket from './PostTicket'
import Products from './Products'
import RenderList from './RenderList'

const DetailsFeed = () => {
    const dispatch = useDispatch()
    const orders = useSelector(selectOrders)
    const [active, setActive] = useState('')
    const {slug} = router.query
    const [items, setItems] = useState([])

    const handleGetItems = async(orderId) => {
        try {
            setItems([])
            const { data, status } = await axios.get(`/api/orders/items/${orderId}`)
            if(status ==200) return (
                setItems(data)
               
            )
            dispatch(setError(data.message)) 
        } catch (error) {
            dispatch(setError(error?.response?.data?.message)) 
        }
    }

    useEffect(() => {
        handleGetItems(active)
    }, [active])

    useEffect(() =>{
        setActive(slug)
    }, [slug])
    return (
        <Fragment>
            <main className='grid grid-cols-1 md:grid-cols-2
            md: max-w-3xl xl:grid-cols-7 xl:max-w-[95%] mx-auto shadow-md px-0 h-[85%]'>
            <div className='hidden xl:inline-grid col-span-1 overflow-auto scrollbar-none px-0 h-full bg-white                '
            >
                <DrawerMenu />
                <PostingAnalysis />
            </div>
           
            <section className="col-span-6 overflow-y-auto pb-20 h-[100%] overflow-auto scrollbar-none">
                <div className='xl:inline-grid md:col-span-6 flex items-center justify-center w-full
                    py-2
                '
                >
                   <h1
                        className='text-pos_color font-bold text-2xl'
                   >POINT OF SALE (WITH INVENTORY)</h1>
                </div>
                <main className='grid grid-cols-8 md:grid-cols-8 h-full'>

                    <div className='hidden xl:inline-grid md:col-span-3
                        top-2 sticky overflow-hidden scrollbar-none'>
                        <div className='flex-1 top-4 w-full sticky overflow-hidden scrollbar-none px-2'>
                            <div
                                className='border border-b-0 flex items-center justify-center py-1'
                            >
                                <h3
                                    className='font-semibold'
                                >Order Records</h3>
                            </div>
                            <table
                                className='w-full'
                            >
                                <thead>
                                    <th className='border text-xs py-2'>Order On</th>
                                    <th className='border text-xs py-2'>Cust./Vend.</th>
                                    <th className='border text-xs py-2'>Order ID</th>
                                </thead>
                                <tbody
                                    className='w-full'
                                >
                                    {
                                        orders?.length > 0 &&
                                        orders?.map((item, index) => {
                                            const {orderId, orderOn, customerRef} = item
                                            return (
                                                <Fragment
                                                    key={index*1234}
                                                >
                                                    <tr
                                                        onClick={() =>setActive(orderId)}
                                                        className={`${index % 2 ? 'bg-gray-100': 'bg-white'} ${active == orderId ? 'text-pos_color-green': ''}` }
                                                    >
                                                        <td
                                                            className='cursor-pointer'
                                                        
                                                        > {new Date(orderOn).toLocaleDateString()} </td>
                                                        <td
                                                            className='cursor-pointer'
                                                        
                                                        > {`${customerRef?.firstName} ${customerRef?.lastName}`} </td>
                                                        <td
                                                            className='cursor-pointer'
                                                        
                                                        > {orderId} </td>
                                                    </tr>
                                                </Fragment>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div className='hidden xl:inline-grid md:col-span-5
                        top-2 sticky overflow-auto scrollbar-none flex-1'>
                        <section>
                            <div className='flex-1 top-4'>
                                <RenderList 
                                    itmes={items}
                                />
                            </div>
                            
                        </section>
                    </div>
                    
                </main>
                
            </section>

           
        </main>
        </Fragment>
    )
}

export default DetailsFeed
