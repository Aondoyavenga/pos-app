import { MinusCircleIcon, PlusCircleIcon, PlusIcon } from "@heroicons/react/solid"
import { IconButton } from "@mui/material"
import { Fragment } from "react"
import Currency from 'react-currency-formatter'
import { useSelector } from "react-redux"
import { selectCalloverOrder, selectTotalSummary } from "../app/slices/orderSlice"
import PostingAnalysis from "./PostingAnalysis"

const PayForm = ({
    data, 
    setData,
    paymentform,
    addPaymentForm,
    handleRemovePaymentform,
    handlesetPaymentFormData

}) => {
    const callover = useSelector(selectCalloverOrder)
    const totalSummary = useSelector(selectTotalSummary)
    
    return (
        <Fragment>
            <section className='py-3'>
               <div
                    className='flex justify-between items-center'
               >
                    <p className="text-sm text-gray-500 py-2">
                        Are you sure you want to pay total sum of {
                            <strong
                                className='text-red-500'
                            >{
                                callover?.totalPaid > 0 ?
                                
                                <Currency 
                                    currency='NGN'
                                    quantity={totalSummary? parseInt(totalSummary?.sumTotal ) -  parseInt(data?.totalPaid): 0}
                                /> :
                                <Currency 
                                    currency='NGN'
                                    quantity={data?.amount? data.amount : 0}
                                />  
                            }
                            </strong>
                        }. or pay ?
                    </p>
                    <h3
                        className="text-xl font-semibold text-pos_color"
                    >Total Summary</h3>
               </div>
                <section 
                    className='flex justify-between items-center'
                >
                    <main>
                        <div className='flex justify-between gap-2'>
                            <div>
                                <span>Add</span>
                               
                            </div>
                            <div
                                className="flex-1"
                            >

                                <span>Amount</span>
                                
                            </div>
                            <div
                                className="flex-1"
                            >
                                <span>Payment Method</span>
                                
                            </div>
                            <div>
                                <span>Remove</span>
                            </div>
                        </div>

                        <div className='flex flex-col justify-between items-center gap-2'>
                            {
                                paymentform?.map((form, index) =>{
                                    const { amount, payMethod } = form
                                    return(
                                        <section 
                                            key={index*565456}
                                            className="flex flex-row justify-between items-center gap-2"
                                        >
                                          
                                            <div
                                                className="flex items-center justify-center"
                                            >
                                                <IconButton
                                                    size="small"
                                                    onClick={() =>addPaymentForm()}
                                                >
                                                    <PlusCircleIcon className="w-6 h-6 text-black hover:text-pos_color-green" />
                                                </IconButton>
                                            </div>
                                           
                                            <div>                                            
                                                <input 
                                                    type="number" 
                                                    value={amount}
                                                    placeholder='Amount' 
                                                    onChange={e =>handlesetPaymentFormData('amount', parseInt(e.target.value), index)}
                                                    className='w-full hover:ring-0 focus:ring-0 mt-3 rounded '

                                                />
                                            </div>

                                            <div
                                                className="flex-1"
                                            >
                                                <select
                                                    name='payMethod'
                                                    value={payMethod}
                                                    onChange={e =>handlesetPaymentFormData('payMethod', e.target.value, index)}
                                                    className='w-full h-[45px] mt-3 rounded hover:ring-0 focus:ring-0'
                                                >
                                                    <option value=""></option>
                                                    <option value="POS">POS</option>
                                                    <option value="Cash">Cash</option>
                                                    <option value="Transfer">Transfer</option>
                                                </select>
                                            </div>                                          
                                            
                                            <div
                                                className="flex items-center justify-center"
                                            >
                                                <IconButton
                                                    size="small"
                                                    onClick={() =>handleRemovePaymentform(index)}
                                                >
                                                    <MinusCircleIcon className="w-6 h-6 text-black hover:text-red-500" />
                                                </IconButton>
                                            </div>
                                           
                                        </section>
                                    )
                                
                                })
                            }
                        </div>

                   </main>
                    <div className="flex-1">
                       <PostingAnalysis 
                            right
                            totalPaid={data.totalPaid}
                       />
                    </div>
                </section>
            </section>
        </Fragment>
    )
}

export default PayForm