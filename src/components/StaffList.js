import { DotsCircleHorizontalIcon } from '@heroicons/react/outline'
import { IconButton } from '@mui/material'
import React, { Fragment } from 'react'
import {useSelector} from 'react-redux'
import { selectStaffs } from '../app/slices/staffSlice'

const StaffList = () => {
    const staffs = useSelector(selectStaffs)
   
    return (
        <Fragment>
           
            <div
                className='shadow p-2 mt-2 bg-gray-50'
            >
                <h3
                    className='text-xl font-semibold text-pos_color'
                > Staff List </h3>
                {
                    staffs?.length > 0 &&
               
                <table
                    className='w-full table stripped'
                >
                    <thead>
                        <th className='text-sm'>S/N</th>
                        <th className='text-sm'>Name's</th>
                        <th className='text-sm'>Phone Number</th>
                        <th className='text-sm'>Email Address</th>
                        <th className='text-sm'>Role</th>
                        <th className='text-sm'>Status</th>
                        <th className='text-sm'></th>
                    </thead>
                    <tbody>
                        {
                            staffs?.map((item, index) => {
                                const { email, role, status, firstName, lastName, phoneNumber } = item
                                return (
                                    <Fragment
                                        key={index*4582}
                                    >
                                        <tr
                                            className={index % 2 ? 'bg-gray-100': 'bg-white'}
                                        >
                                            <td className='text-center text-sm cursor-pointer text-pos_color-green'> {index+1} </td>
                                            <td className='text-center text-sm cursor-pointer'> {`${firstName} ${lastName}`} </td>
                                            <td className='text-center text-sm cursor-pointer'> {phoneNumber} </td>
                                            <td className='text-center text-sm cursor-pointer'> {email} </td>
                                            <td className='text-center text-sm cursor-pointer'> {status} </td>
                                            
                                            <td className='text-center text-sm cursor-pointer'>
                                                <div>
                                                    <IconButton
                                                        size='small'
                                                        onClick={() =>{}}
                                                    >
                                                        <DotsCircleHorizontalIcon 
                                                            className='w-6'
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

export default StaffList