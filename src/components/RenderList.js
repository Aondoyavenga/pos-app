import React, {Fragment} from 'react'
import { DotsCircleHorizontalIcon } from '@heroicons/react/outline'
import { IconButton } from '@mui/material'

const RenderList = ({itmes}) => {
    return(
        <Fragment>
            <table 
                className='table w-full'
            >
                <thead>
                    <th className='text-sm text-center'>S/N</th>
                    <th className='text-sm text-center'> SKU/UPC </th>
                    <th className='text-sm text-center'> Product Name </th>
                    <th className='text-sm text-center'> Order Type </th>
                    <th className='text-sm text-center'> Quantity </th>
                    <th className='text-sm text-center'> Rate (<strike>N</strike>) </th>
                    <th className='text-sm text-center'> Amount (<strike>N</strike>) </th>
                    <th></th>
                </thead>
                <tbody className='w-full'>
                    {
                        itmes?.map((item, index) =>{
                            const {SKU_UPC, orderType, productRef: {productName}, quantity, amount, total } = item
                            return(
                                <Fragment
                                    key={index*10981}
                                >
                                    <tr
                                        className={`${index % 2 ? 'bg-gray-100':  'bg-white'}`}
                                    >
                                        <td className='text-base text-center cursor-pointer text-pos_color-green'> {index +1} </td>
                                        <td className='text-base text-center cursor-pointer'> {SKU_UPC} </td>
                                        <td className='text-base text-center cursor-pointer'> {productName} </td>
                                        <td className='text-base text-center cursor-pointer'> {orderType} </td>
                                        <td className='text-base text-center cursor-pointer'> {quantity} </td>
                                        <td className='text-base text-center cursor-pointer text-red-500'> {amount?.toLocaleString()} </td>
                                        <td className='text-base text-center cursor-pointer text-pos_color-green'> {total?.toLocaleString()} </td>
                                        <td className='text-base text-center cursor-pointer text-pos_color-green'>
                                            <div>
                                                <IconButton
                                                    size='small'
                                                >
                                                    <DotsCircleHorizontalIcon className='w-6' />
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
        </Fragment>
    )
}

export default RenderList