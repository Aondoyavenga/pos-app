import React, { Fragment } from 'react'
import { Divider, Typography } from '@mui/material'
import { PrinterIcon } from '@heroicons/react/solid'
import { useReactToPrint } from 'react-to-print';
import { createRef } from 'react'
import { useSelector } from 'react-redux';
import { selectVoucher } from '../app/slices/orderSlice';
import Currency from 'react-currency-formatter'
import { MailIcon } from '@heroicons/react/outline';
import Barcode from 'react-barcode'
import { DOMAIN } from '../constant';
const NewReceipt = () => {
    const componentRef = createRef(null)
    const voucher = useSelector(selectVoucher)
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    const renderQty = (data) => {
        const qty = data?.reduce((a, b) => a+b.quantity, 0)
        return qty
    }

    return (
        <Fragment>
            <main
                className='mx-4'
                ref={componentRef}
            >

                <nav
                    className='flex justify-between flex-col items-center printFlex -mt-8'
                >
                    <div className=''>
                        <div>
                            <img 
                                src={`${DOMAIN}public/static/logo.png`}
                                style={{
                                height:160,
                                width:160,
                                objectFit:'contain'
                                }}
                                alt="logo"
                            />
                        </div>
    
                        {/* s<Typography variant='subtitle1' className='text-sm'>Parvic Supermarkets</Typography> */}
                    </div>
                    
                </nav>
               
               <section
                    className='flex flex-row justify-between -mt-8'
               > 
                    <div>
                        <Typography variant='subtitle1'>
                            {new Date(voucher?.order?.createdAt).toLocaleString()?.split(',')[0]}
                        </Typography>  
                                         
                    </div>
                    <div>
                        <Typography variant='subtitle1'>Sales Receipt # </Typography>
                    </div>
                    <Typography variant='subtitle1' className='font-semibold'>
                        CA{voucher?.order?.orderId}
                    </Typography>   
               </section>

               <section>
                   <div className='flex flex-row justify-between'>
                        <Typography variant='subtitle1'>
                            {new Date(voucher?.order?.createdAt).toLocaleString()?.split(',')[1]}
                        </Typography> 
                        <div className='text-right'>
                            <Typography variant='p' className='text-black font-sans text-lg'>
                                TAXNO: 23359562-0001
                            </Typography>
                        </div>
                   </div>
                    <div className='w-full flex items-center mb-2'>
                        <Typography variant='p' className='font-bold text-center text-xl'>
                            PARVIC SUPERMARKET, DUTSE BRANCH 
                        </Typography>
                    </div>
                    <Typography variant='p' className='py-2'>
                        Cashier: 
                            <span className='ml-4'>
                                {`${voucher?.order?.userRef?.firstName?.toUpperCase()} `}
                            </span>
                    </Typography>
                   

               </section>
               
                <div className='py-2' />
                <table className='w-full'>
                    <thead className='border-t-2 border-dashed border-black'>
                        {/* <th className='printSize'>#</th> */}
                        <th className='py-2'>
                            <Typography variant='subtitle1'>Item</Typography>
                        </th>
                        <th className='py-2 text-center'>
                            <Typography variant='subtitle1' className='mr-4'>Qty</Typography>
                        </th>
                        <th className='py-2 text-center'>
                            <Typography variant='subtitle1'>
                                Price
                            </Typography>
                        </th>
                        <th className='py-2 text-right'>
                            <Typography variant='subtitle1' className='ml-2'>Disc</Typography>
                        </th>
                        <th className='py-2 text-right'>
                            <Typography variant='subtitle1'>Ext Price</Typography>
                        </th>
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
                                        <tr className='border-b-2 border-black border-dashed'>
                                            {/* <td className=' border-t printSize'> {index+1} </td> */}
                                            <td className='py-2 border-t-2 border-black border-dashed text-xl'> {productName} </td>
                                            <td className='py-2 border-t-2 border-black border-dashed text-xl text-center'> {quantity} </td>
                                            <td className='py-2 border-t-2 border-black border-dashed text-xl text-center'> {amount} </td>
                                            <td className='py-2 border-t-2 border-black border-dashed text-xl text-right'>{discount}</td>
                                            <td className='py-2 border-t-2 border-black border-dashed text-xl text-right'> {total} </td>
                                        </tr>

                                    </Fragment>
                                )
                            })
                        }
                
                        <tr className=''>
                            <td className='' >
                                <Typography variant='subtitle1'>
                                    Tot items:
                                </Typography>
                            </td>
                            <td className='text-center' >
                                <Typography variant='subtitle1'> {voucher?.orderItems?.length} </Typography>
                            </td>
                            <td className='' colSpan={2}>
                                <Typography variant='subtitle1'>
                                    Sub Amt:
                                </Typography>
                            </td>
                            <td className='text-right'>
                                <Typography variant='subtitle1' className='text-black'>
                                   {voucher?.order?.amount}
                                </Typography>
                            </td>
                        </tr>
                        <tr className=''>
                            <td className='' >
                                <Typography variant='subtitle1'>
                                    Tot Qty:
                                </Typography>
                            </td>
                            <td className='text-center' >
                                <Typography variant='subtitle1'> {renderQty(voucher?.orderItems)} </Typography>
                            </td>
                            <td className='' colSpan={2}>
                                <Typography variant='subtitle1'>
                                    Dis Amt:
                                </Typography>
                            </td>
                            <td className='text-right'>
                                <Typography variant='subtitle1' className='text-black'>
                                    <Currency 
                                        currency='NGN'
                                        quantity={voucher?.order?.discount? voucher?.order?.discount : 0}
                                    />
                                </Typography>
                            </td>
                        </tr>
                        <tr className=''>
                            <td className='' >
                                <Typography className variant='subtitle1'>
                                    VAT INCLUSIVE
                                </Typography>
                            </td>
                            <td className='' >
                                <Typography className variant='subtitle1'>  </Typography>
                            </td>
                            <td className='border-b-2 border-dashed border-black' colSpan={2}>
                                <Typography className variant='subtitle1'>
                                   TOT VAT:
                                </Typography>
                            </td>
                            <td className='text-right border-b-2 border-dashed border-black'>
                                <Typography variant='subtitle1' className='text-black'>
                                    <Currency 
                                        currency='NGN'
                                        quantity={0}
                                    />
                                </Typography>
                            </td>
                        </tr>
                        <tr className=''>
                            <td className='' >
                                <Typography className='text-lg' variant='subtitle1'>
                                   
                                </Typography>
                            </td>
                            <td className='' >
                                <Typography className='text-lg' variant='subtitle1'>  </Typography>
                            </td>
                            <td className='border-b-2 border-black border-dashed' colSpan={2}>
                                <Typography variant='subtitle1' className='text-lg font-bold py-2'>
                                   Tot Amt:
                                </Typography>
                            </td>
                            <td className='text-right border-b-2 border-black border-dashed py-2'>
                                <Typography variant='subtitle1' className='text-lg font-bold'>
                                    <Currency 
                                        currency='NGN'
                                        quantity={ voucher?.order?.amount}
                                    />
                                </Typography>
                            </td>
                        </tr>
                        <div className='mt-4' />
                        <tr className=''>
                            <td className='' >
                                <Typography className='text-lg' variant='subtitle1'>
                                   Cash Tendered
                                </Typography>
                            </td>
                            <td className='' >
                                <Typography className='text-lg' variant='subtitle1'>  </Typography>
                            </td>
                            <td colSpan={2}>
                                <Typography variant='subtitle1'>
                                   :
                                </Typography>
                            </td>
                            <td className='text-right'>
                                <Typography variant='subtitle1'>
                                    { voucher?.order?.totalPaid?.toLocaleString()}
                                </Typography>
                            </td>
                        </tr>
                        <tr className=''>
                            <td className='' >
                                <Typography className='text-lg' variant='subtitle1'>
                                   Balance Amount
                                </Typography>
                            </td>
                            <td className='' >
                                <Typography className='text-lg' variant='subtitle1'>  </Typography>
                            </td>
                            <td colSpan={2}>
                                <Typography variant='subtitle1'>
                                   :
                                </Typography>
                            </td>
                            <td className='text-right'>
                                <Typography variant='subtitle1'>
                                {voucher?.order?.totalPaid - voucher?.order?.amount}
                                </Typography>
                            </td>
                        </tr>
                        <tr className=''>
                            <td className='' >
                                <Typography className='text-lg' variant='subtitle1'>
                                  Customer Name:
                                </Typography>
                            </td>
                            <td className='' >
                                <Typography className='text-lg' variant='subtitle1'>  </Typography>
                            </td>
                            <td colSpan={2}>
                                <Typography variant='subtitle1'>
                                   
                                </Typography>
                            </td>
                            <td className='text-right'>
                                <Typography variant='subtitle1'>
                                
                                </Typography>
                            </td>
                        </tr>                       
                    </tbody>
                </table>
                
                <div className='text-center w-full flex-col flex items-center justify-center'>
                    <Typography variant='subtitle1' className='text-[16px]'>
                        Thanks for Shopping
                    </Typography>
                    <Typography variant='subtitle1' className='text-[16px]'>
                        Pay less More Savings everyday
                    </Typography>
                    <Typography variant='subtitle1' className='text-[16px]'>
                        No Gurantee Exchange and No Cash refund after<br />
                        Purchase please
                    </Typography>
                    <Typography variant='subtitle1' className='text-[16px]'>
                        Phone Number: 09162220163, 
                    </Typography>
                    <Typography variant='subtitle1' className='text-[16px]'>
                        Email: info@parvicsupermartkets.net
                    </Typography>
                    <Typography variant='subtitle1' className='text-[16px]'>
                        www.parvicsupermarkets.net
                    </Typography>
                    <Typography variant='subtitle1' className='font-bold'>
                       <Barcode 
                            
                                height={50}
                            
                            value={`CA${voucher?.order?.orderId}`}
                       />
                    </Typography>
                </div>
                <div className='py-2' />

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

export default NewReceipt