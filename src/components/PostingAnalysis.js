import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import Currency from 'react-currency-formatter'
import { selectTotalSummary } from '../app/slices/orderSlice'

const PostingAnalysis = ({totalPaid, right}) => {
    const totalSummary = useSelector(selectTotalSummary)
    return (
        <Fragment>
            <div className='text-sm px-3 bg-white text-pos_color font-medium'>
            <table className='w-full'>
                <tr>
                    <td className={`cursor-pointer border border-1 ${right ? 'text-right' : ''} border-gray-50 py-1`}>Sub Total: </td>
                    <td className='cursor-pointer border border-1 text-right border-gray-50 py-1
                    font-semibold text-pos_color
                    '>
                        <Currency 
                            currency='NGN'
                            quantity={totalSummary?.total? totalSummary?.total: 0}
                        />
                    </td>
                </tr>
                {/* <tr>
                    <td className={`cursor-pointer border border-1 ${right ? 'text-right' : ''} border-gray-50 py-1`}>Tax (8.5%): </td>
                    <td className='cursor-pointer border border-1 text-right border-gray-50 py-1
                    font-semibold text-pos_color
                    '>
                        <Currency 
                            currency='NGN'
                            quantity={totalSummary?.tax ? totalSummary?.tax: 0}
                        />
                    </td>
                </tr> */}
                <tr>
                    <td className={`cursor-pointer border border-1 ${right ? 'text-right' : ''} border-gray-50 py-1`}>Total: </td>
                    <td className='cursor-pointer border border-1 text-right border-gray-50 py-1
                font-semibold text-pos_color-green
                    '>
                        <Currency 
                        
                            currency='NGN'
                            quantity={totalSummary?.sumTotal? totalSummary?.sumTotal: 0}
                        />
                    </td>
                </tr>
                <tr>
                    <td className={`cursor-pointer border border-1 ${right ? 'text-right' : ''} border-gray-50 py-1`}>Total Paid: </td>
                    <td className='cursor-pointer border border-1 text-right border-gray-50 py-1
                    font-semibold text-pos_color
                    '>
                        <Currency 
                            currency='NGN'
                            quantity={totalPaid? totalPaid:0}
                        />
                    </td>
                </tr>
                <tr>
                    <td className={`cursor-pointer border border-1 ${right ? 'text-right' : ''} border-gray-50 py-1`}>Balance: </td>
                    <td className='cursor-pointer border border-1 text-right border-gray-50 py-1
                    font-semibold text-red-500
                    '>
                        {
                            totalSummary && totalPaid && 
                            <Fragment>
                                <Currency 
                                    currency='NGN'
                                    quantity={totalSummary? parseInt(totalSummary?.sumTotal )-  parseInt(totalPaid)  : 0 }
                                />
                            </Fragment>
                        }
                    </td>
                </tr>

            </table>
            </div>
        </Fragment>
    )
}

export default PostingAnalysis
