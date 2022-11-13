import React, { Fragment } from 'react'
import { Typography } from '@mui/material'
import { PrinterIcon } from '@heroicons/react/solid'
import { useReactToPrint } from 'react-to-print';
import { createRef } from 'react'
import { useSelector } from 'react-redux';
import { selectVoucher } from '../app/slices/orderSlice';
import Currency from 'react-currency-formatter'
import { MailIcon } from '@heroicons/react/outline';
import { DOMAIN } from '../constant';
const SalesReceipt = () => {
    const componentRef = createRef(null)
    const voucher = useSelector(selectVoucher)
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })
    return (
        <Fragment>
            <main
                className='mx-4'
                ref={componentRef}
            >

                <nav
                    className='flex justify-between flex-col items-center printFlex'
                >
                    <div className=''>
                        <div>
                            <img 
                                src={`${DOMAIN}public/static/logo.png`}
                                style={{
                                height:150,
                                width:150,
                                objectFit:'contain'
                                }}
                                alt="logo"
                            />
                        </div>
    
                        {/* s<Typography variant='subtitle1' className='text-sm'>Parvic Supermarkets</Typography> */}
                    </div>
                    <div
                        className='flex -mt-12 w-full flex-col items-center'
                    >
                        <Typography variant='subtitle1'>#{voucher?.order?.orderId}/ {new Date(voucher?.order?.createdAt).toLocaleDateString()}</Typography>
                        {/* <Typography variant='caption'>Abdul Plaza Off Tasha Bwari Express Way, <br />
                            Off Sokale Roundabout Dutse, FCT Abuja.
                        </Typography> */}
                        <Typography variant='caption' className='font-semibold'>
                            ABDUL PLAZA, PLOT BDS 01 DUT</Typography>

                        <Typography variant='caption' className='font-semibold'>
                            +234 916 2220 163, 
                        </Typography>
                        <Typography variant='caption'>
                            info@parvicsupermartkets.net
                        </Typography>
                    </div>
                </nav>
                <Typography variant='subtitle1'>Sales Receipt #{voucher?.order?.orderId} </Typography>
                <head className='border-t flex justify-around'>
                    <div className='w-full'>
                        <Typography variant='subtitle1' className='printSize'>
                            Sold To: <b> {`${voucher?.order?.customerRef?.firstName} ${voucher?.order?.customerRef?.lastName}`} </b>
                        </Typography>
                    </div>
                    <table className='w-full border border-t-0'>
                        <th className='border-b border-r'> 
                            <Typography variant='subtitle1' className='font-semibold printSize'>
                                Sales Receipt
                            </Typography> 
                        </th>
                        
                        <th className='border-b' >
                            <Typography variant='caption'>#{voucher?.order?.orderId}</Typography>
                        </th>
                        
                        <tbody>
                        <th className='border'>
                            <Typography variant='caption'>Raised By</Typography>
                        </th>
                        <th>
                            <Typography variant='caption'>
                                {`${voucher?.order?.userRef?.firstName} ${voucher?.order?.userRef?.lastName}`}
                            </Typography>
                        </th>
                        </tbody>
                    </table>
                </head>
                <div className='py-4' />
                <table className='w-full border'>
                    <thead className='bg-pos_color text-white'>
                        <th className='border-r printSize'>#</th>
                        <th className='border-r printSize'>Item</th>
                        <th className='border-r printSize'>Quantity</th>
                        <th className='border-r printSize'>S.Price</th>
                        <th className='border-r printSize'>Discount</th>
                        <th className='border-r printSize'>Total</th>
                    </thead>
                    <tbody>
                        {
                            voucher?.orderItems?.length > 0 &&
                            voucher?.orderItems?.map((item, index) => {
                                const {productRef: {productName}, quantity, amount, total, discount} = item
                                return (
                                    <Fragment
                                        key={index*989}
                                    >
                                        <tr className={index % 2 ? 'bg-gray-100': 'bg-white'}>
                                            <td className='border-r border-t printSize'> {index+1} </td>
                                            <td className='border-r border-t printSize'> {productName} </td>
                                            <td className='border-r border-t printSize'> {quantity} </td>
                                            <td className='border-r border-t printSize'> {amount} </td>
                                            <td className='border-r border-t printSize'>{discount}</td>
                                            <td className='border-r border-t printSize'> {total} </td>
                                        </tr>

                                    </Fragment>
                                )
                            })
                        }
                        
                        
                    </tbody>
                </table>
                <div className='py-4' />
                <table className='w-full border'>
                    <tr className='border-b'>
                        <td className='border-r' colSpan={2}>
                            <Typography variant='caption' className='font-semibold'>Payment Details</Typography>
                        </td>
                        <td className='border-r'>
                            <Typography variant='caption' className='font-semibold'>Net Total:</Typography>
                        </td>
                        <td className='border-r' colSpan={3}>
                            <Typography variant='caption' className='text-red-500'>
                                <Currency 
                                    currency='NGN'
                                    quantity={voucher?.order?.amount}
                                />
                            </Typography>
                        </td>
                    </tr>
                    <tr>
                        <td className='border-r'>
                            <Typography variant='caption' className='font-semibold'>Paid</Typography>
                        </td>
                        <td className='border-r'>
                            <Typography variant='caption' className='text-pos_color-green'>
                                <Currency 
                                    currency='NGN'
                                    quantity={voucher?.order?.totalPaid}
                                />
                            </Typography>
                        </td>
                        <td className='border-r'>
                            <Typography variant='caption' className='font-semibold'>Balance</Typography>
                        </td>
                        <td className='border-r'>
                            <Typography variant='caption' className='text-pos_color'>
                                <Currency 
                                    currency='NGN'
                                    quantity={voucher?.order?.totalPaid - voucher?.order?.amount}
                                />
                            </Typography>
                        </td>
                        <td className='border-r'>
                            <Typography variant='caption' className='font-semibold'>By:</Typography>
                        </td>
                        <td className='border-r' colSpan={3}>
                            <Typography variant='caption'>{`${voucher?.order?.userRef?.firstName} ${voucher?.order?.userRef?.lastName}`}</Typography>
                        </td>
                    </tr>
                </table>
                <div className='py-4' />

               

            </main>
            <div
                className='flex items-center gap-2 justify-end'
            >
                <button 
                    className='bg-pos_color shadow-md px-2 py-2 rounded-md 
                    hover:shadow-xl text-white flex gap-2'
                >Email Receipt <MailIcon className='w-6' /></button>
                <button 
                    onClick={handlePrint}
                    className='bg-black text-white shadow-md px-2 py-2 rounded-md
                    hover:shadow-xl flex gap-2'
                >Print Preview <PrinterIcon className='w-6' /></button>
            </div>
        </Fragment>
    )
}

export default SalesReceipt