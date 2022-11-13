import React, { Fragment } from 'react'
import { MinusCircleIcon, PlusCircleIcon, PrinterIcon, ReceiptRefundIcon, TrashIcon, UserIcon, XCircleIcon } from '@heroicons/react/solid'

const CustomerTableView = ({saleForm, orderType, handleChange, handleRemovesaleform}) => {
    return (
        <Fragment>
            
            <table className='table border border-1 w-full -my-3 py-2'>
                <thead className='border border-1 border-gray-400'>
                    <th></th>
                    <th className='text-sm py-2 text-center text-pos_color'>SKU/UPC</th>
                    <th className='text-sm py-2 text-center text-pos_color'>Product Name</th>
                    <th className='text-sm py-2 text-center text-pos_color'>Qty</th>
                    <th className='text-sm py-2 text-center text-pos_color'>Amount</th>
                    <th className='text-sm py-2 text-center text-pos_color'>Disc. %</th>
                    <th className='text-sm py-2 text-center text-pos_color'>Total</th>
                    <th>  </th>
                    <th className='text-sm py-2 text-center text-pos_color'>
                        <p className='text-xs'>Qty on Hand</p>
                    </th>

                </thead>
                <tbody className='w-full'>
                {saleForm.map((salef, index) => (
                    
                  <Fragment key={index}>
                    <tr 
                        key={index}
                        className={`${index % 2 ? 'bg-gray-100':  'bg-white'} ${salef.quantity > salef.Qty? 'border-2 border-red-500': ''}`}
                    >
                        <td className='cursor-pointer py-2 text-center text-base text-pos_color-green'> {index+1} </td>
                        <td className='cursor-pointer py-2 text-center text-base'> {salef.SKU_UPC} </td>
                        <td className='cursor-pointer py-2 text-center text-base'>{salef.product}</td>
                        <td className='cursor-pointer py-2 text-center text-base flex flex-row gap-2 items-center justify-center'>
                            <p className='hover:text-red-600' >
                                <MinusCircleIcon 
                                    className='h-5 w-5'
                                    onClick={() =>handleChange('quantity',(parseInt(salef.quantity)-1), index )}
                                />
                            </p>
                            <p>
                                {salef.quantity}
                            </p>
                            <p className='hover:text-pos_color-green' >
                                <PlusCircleIcon 
                                    className={`h-5 w-5 ${salef.quantity < 1 ? 'text-red-500': ''}`}
                                    onClick={() =>handleChange('quantity',(parseInt(salef.quantity)+1), index )}
                                />
                            </p>
                        </td>
                        <td className='cursor-pointer py-2 text-center text-base'> {
                           salef.amount?.toLocaleString()
                        } </td>
                        <td className='cursor-pointer py-2 text-center text-base'> {salef.discount} </td>
                        <td className='cursor-pointer py-2 text-center text-base'>{salef.total?.toLocaleString()}</td>
                        <td className='cursor-pointer py-2 text-center text-base'>
                            <XCircleIcon 
                                className={`h-5 w-5 hover:text-red-600 ${salef.quantity > salef.Qty && orderType == 'SALE' ? 'text-red-500': ''}`}
                                onClick={() =>handleRemovesaleform(index)}
                            />
                        </td>
                        <td className='cursor-pointer py-2 text-center text-base'>
                            <p className='self-center ml-6'> {salef.Qty} </p>
                        </td>
                    </tr>
                    </Fragment>
                ))}
                </tbody>

            </table>
        </Fragment>
    )
}

export default CustomerTableView