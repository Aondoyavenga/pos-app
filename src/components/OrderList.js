import { DotsCircleHorizontalIcon, MinusCircleIcon } from '@heroicons/react/outline'
import { PrinterIcon } from '@heroicons/react/solid'
import { Button, IconButton, Tooltip } from '@mui/material'
import React, { Fragment, useState, createRef } from 'react'
import { useDispatch } from 'react-redux'
import {useSelector} from 'react-redux'
import {useReactToPrint} from 'react-to-print'
import { selectOrderItems, selectOrders } from '../app/slices/orderSlice'
import { selectUser } from '../app/slices/userSlice'
import { handleDeleteOrder, handleGetItems, handleGetReceipt } from '../appHooks/orderHook'
import MorePop from './global/MorePop'
import RenderList from './RenderList'


const OrderList = ({title}) => {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const orders = useSelector(selectOrders)
    const items = useSelector(selectOrderItems)
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')

    const printTableREf = createRef(null)
    const handlePrint = useReactToPrint({
        content: () => printTableREf.current,
    })
   
    return (
        <Fragment>
            <MorePop
                open={open}
                setOpen={setOpen}
                title='Order Items'
            >
                <RenderList 
                    itmes={items}
                />
            </MorePop>
            <div
                className=' p-2 mt-2 bg-gray-50'
            >
                <div
                    className='flex items-center justify-between py-2'
                >
                    <h3
                        className='text-xl font-semibold text-pos_color flex-1'
                    > { title ? title : 'Order List'} </h3>
                    <div
                        className='w-[50%]'
                    >
                        <input 
                            type="text" 
                            name="search"
                            value={search}
                            onChange={e =>setSearch(e.target.value)}
                            placeholder='Search by order Id, type, status & order on'
                            className='w-full border-none focus:ring-0 hover:ring-0 shadow rounded-full'
                        />
                    </div>
                </div>
                {
                    orders?.length > 0 &&
                    <table
                        ref={printTableREf}
                        className='w-full table stripped'
                    >
                        <thead>
                            <th className='text-sm'>S/N</th>
                            <th className='text-sm'>Order ID</th>
                            <th className='text-sm'>Order On</th>
                            <th className='text-sm'>Type</th>
                            <th className='text-sm'>Status</th>
                            <th className='text-sm'>Customer/Vendor</th>
                            <th className='text-sm'>User</th>
                            <th className='text-sm'>Amount (<strike>N</strike>)</th>
                            <th className='text-sm'>Total Paid (<strike>N</strike>)</th>
                            <th className='text-sm'>Balance (<strike>N</strike>)</th>
                            <th className='text-sm'></th>
                        </thead>
                        <tbody>
                            {
                                orders?.filter(item =>{
                                    if(search == '') {
                                        return item
                                    }else if(item.orderId?.includes(search)){
                                        return item
                                    }else if(item.orderOn?.includes(search)){
                                        return item
                                    }else if(item.orderType?.toLowerCase().includes(search.toLowerCase())){
                                        return item
                                    }else if(item.customerRef?.firstName?.toLowerCase().includes(search.toLowerCase())){
                                        return item
                                    }else if(item.customerRef?.lastName?.toLowerCase().includes(search.toLowerCase())){
                                        return item
                                    }else if(item.amount?.toString().includes(search.toLowerCase())){
                                        return item
                                    }
                                })
                                .map((items, index) => {
                                    const { orderId, status,orderType, customerRef, userRef, amount, totalPaid, orderOn } = items
                                    return (
                                        <Fragment
                                            key={index*4582}
                                        >
                                            <tr
                                                className={index % 2 ? 'bg-gray-100': 'bg-white'}
                                            >
                                                <td className='text-center text-sm cursor-pointer text-pos_color-green'> {index+1} </td>
                                                <td className='text-center text-sm cursor-pointer'> {orderId} </td>
                                                <td className='text-center text-sm cursor-pointer'> {new Date(orderOn).toLocaleDateString()} </td>
                                                <td className='text-center text-sm cursor-pointer'> {orderType} </td>
                                                {
                                                    status=='Paid' ? <td className='text-center text-sm cursor-pointer'> {status} </td>:
                                                    <td className='text-center text-sm cursor-pointer
                                                    hover:text-pos_color-green
                                                '
                                                    onClick={() => handleGetItems(orderId, dispatch, setOpen, items)}
                                                > {status} </td>
                                                }
                                                <td className='text-sm cursor-pointer'> {`${customerRef?.firstName} ${customerRef?.lastName}`} </td>
                                                <td className='text-sm cursor-pointer'> {`${userRef?.firstName} ${userRef?.lastName}`} </td>
                                                <td className='text-center text-sm cursor-pointer text-pos_color-green'> {amount?.toLocaleString()} </td>
                                                <td className='text-center text-sm cursor-pointer text-red-500'> {totalPaid?.toLocaleString()} </td>
                                                <td className='text-center text-sm cursor-pointer text-pos_color-green'> {(amount > totalPaid ? amount - totalPaid: totalPaid - amount)?.toLocaleString()} </td>
                                                <td className='text-center text-sm cursor-pointer hide-on-print'>
                                                    <div className='flex gap-2 items-center'>
                                                        <IconButton
                                                            size='small'
                                                            onClick={() =>handleGetItems(orderId, dispatch, setOpen)}
                                                        >
                                                            <DotsCircleHorizontalIcon 
                                                                className='w-6 hover:text-pos_color-green'
                                                            />
                                                        </IconButton>
                                                        <IconButton
                                                            size='small'
                                                            onClick={() =>handleGetReceipt(orderId, dispatch, items)}
                                                        >
                                                        <PrinterIcon 
                                                            className='w-6 hover:text-pos_color-green' 
                                                        /> 
                                                        </IconButton>

                                                        { 
                                                            user?.role?.manager &&
                                                            <Tooltip title={`Delete ${orderId}`}>
                                                            <IconButton
                                                                size='small'
                                                                onClick={() =>handleDeleteOrder(orderId, dispatch)}
                                                            >
                                                            
                                                                <MinusCircleIcon  
                                                                    className='w-6 hover:text-red-500' 
                                                                /> 
                                                            
                                                            </IconButton>
                                                        </Tooltip>
                                                        }

                                                    </div>
                                                </td>
                                            </tr>
                                        </Fragment>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                }
                <div
                    className='py-2 flex items-center justify-end gap-4'
                >
                    <Button
                        onClick={() => handlePrint()}
                        className='px-5 bg-pos_color text-white'
                    >
                        Print to PDF
                    </Button>
                   {/* <ExcelDownload /> */}
                </div>
            </div>
        </Fragment>
    )
}

export default OrderList