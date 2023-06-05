import { MinusCircleIcon} from '@heroicons/react/outline'
import { PencilAltIcon } from '@heroicons/react/solid'
import { IconButton } from '@mui/material'
import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import {useSelector} from 'react-redux'
import { selectCustomers, setSelectedCustomer } from '../app/slices/customerSlice'

const CustomerList = ({setAction}) => {
    const dispatch = useDispatch()
    const customers = useSelector(selectCustomers)
   
    return (
        <Fragment>
           
            <div
                className='shadow p-2 mt-2 bg-gray-50'
            >
                <h3
                    className='text-xl font-semibold text-pos_color'
                > Customer List </h3>
                {
                    customers?.length > 0 &&
               
                <table
                    className='w-full table stripped'
                >
                    <thead className='text-xs text-gray-500'>
                        <th>S/N</th>
                        <th>Name's</th>
                        <th>Phone Number</th>
                        <th>Status</th>
                        <th></th>
                    </thead>
                    <tbody className='text-xs'>
                        {
                            customers?.map((item, index) => {
                                const { status, firstName, lastName, phoneNumber } = item
                                return (
                                    <Fragment
                                        key={index*4582}
                                    >
                                        <tr
                                            className={index % 2 ? 'bg-gray-100': 'bg-white'}
                                        >
                                            <td className='text-center cursor-pointer text-pos_color-green'> {index+1} </td>
                                            <td className='text-center cursor-pointer'> {`${firstName} ${lastName}`} </td>
                                            <td className='text-center cursor-pointer'> {phoneNumber} </td>
                                            <td className='text-center cursor-pointer'> {status} </td>
                                            
                                            <td className='text-center cursor-pointer'>
                                                <div className='flex gap-4'>
                                                    <IconButton
                                                        size='small'
                                                        onClick={() =>(
                                                            setAction('Delete'),
                                                            dispatch(setSelectedCustomer(item))
                                                        )}
                                                    >
                                                        <MinusCircleIcon
                                                            className='w-5'
                                                        />
                                                    </IconButton>
                                                    <IconButton
                                                        size='small'
                                                        onClick={() =>(
                                                            setAction('Edit'),
                                                            dispatch(setSelectedCustomer(item))
                                                        )}
                                                    >
                                                        <PencilAltIcon 
                                                            className='w-5'
                                                        />
                                                    </IconButton>
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
            </div>
        </Fragment>
    )
}

export default CustomerList