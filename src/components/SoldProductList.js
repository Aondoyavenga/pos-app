import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectSoldProducts } from '../app/slices/orderSlice'

const renderTotal = (data, type) => {
    // return console.log(data)
    if(type === 'quantity') {
        const total = data?.reduce((a,b) => a+b.quantity, 0)
        return total
    } 
    if(type === 'amount') {
        const total = data?.reduce((a,b) => a+b?.amount, 0)
        return total
    } 
}

const returnString = value => {
    return value?.toLocaleString()
}

const  SoldProductList = () => {
    const dispatch = useDispatch()
    const soldProducts = useSelector(selectSoldProducts)
    const [salesgroup, setSalesGroup] = useState([])

    useEffect(() => {

        const unSubscribe = () => {
            const productGroup = soldProducts?.reduce((results, item) => {
                (results[item?.productRef?._id ]= results[item?.productRef?._id] || []).push(item)
                return results
            }, {})

            setSalesGroup(productGroup)
        }

        unSubscribe()

    }, [soldProducts])
  return (
        <Fragment>
           
            <table
                className='table w-full'
            >
                <thead className='text-xs text-gray-500'> 
                    <Fragment>
                    <th>S/N</th>
                    <th>SKU/UPC</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Qty Sold</th>
                    <th>Qty Aval.</th>
                    <th>Pur. Price (<strike>N</strike>)</th>
                    <th>Sold Price (<strike>N</strike>)</th>
                    <th>Total Amt (<strike>N</strike>)</th>
                    </Fragment>
                </thead>

                <tbody className='text-xs'>
                    {
                        // products?.length > 0 &&
                        // products?.products?.filter(item =>{
                        //     if(search == '' ){
                        //         return item
                        //     }else if(item.SKU_UPC?.toString()?.includes(search)) {
                        //         return item
                        //     }else if(item.productName?.toLowerCase()?.includes(search?.toLowerCase())){
                        //         return item
                        //     }else if(item.purchasePrice?.toString()?.includes(search?.toLowerCase())){
                        //         return item
                        //     }else if(item.salesPrice?.toString()?.includes(search?.toLowerCase())){
                        //         return item
                        //     }
                        // })
                        Object.entries(salesgroup)?.map(([key, items], index) => {
                            let i =1
                            const { SKU_UPC,amount, productRef, productRef:{purchasePrice, salesPrice, productName, quantity}} = items[0]

                            return(
                                <Fragment
                                    key={key}
                                >
                                    <tr
                                        className={ index % 2 ? 'bg-gray-100' : 'bg-white'}
                                    >
                                        <td className='cursor-default text-center h-6 text-pos_color-green'> {index+1} </td>
                                        <td className='cursor-default text-center'> {SKU_UPC} </td>
                                        <td className='cursor-default text-center'> {productName} </td>
                                        <td className='cursor-default text-center'> </td>
                                        <td className='cursor-default text-center'>x {renderTotal(items, 'quantity')} </td>
                                        <td className='cursor-default text-center'> {quantity} </td>
                                        {/* <td className='cursor-default text-center'> {quantity} </td> */}
                                        <td className='cursor-default text-center text-red-500'> 
                                            {purchasePrice?.toLocaleString()} 
                                        </td>
                                        <td className='cursor-default text-center text-pos_color-green'> 
                                            {salesPrice?.toLocaleString()} 
                                        </td>

                                        <td className='cursor-default text-right px-2 text-black'> 
                                            {returnString(salesPrice * renderTotal(items, 'quantity'))} 
                                        </td>

                                        {/* <td className='cursor-default text-center'>
                                            <div
                                                className='flex'
                                            >
                                                <IconButton
                                                    size='small'
                                                    onClick={() =>(
                                                        setIsAdd(),
                                                        setDelete(false),
                                                        dispatch(setError(false)),
                                                        dispatch(setSuccess(false)),
                                                        dispatch(setSelectedProduct(items)) 
                                                    )}
                                                >
                                                    <PencilAltIcon className='w-4 hover:text-pos_color-green' />
                                                </IconButton>
                                                <IconButton
                                                    size='small'
                                                    onClick={() =>(
                                                        setDelete(true),
                                                        dispatch(setError(false)),
                                                        dispatch(setSuccess(false)),
                                                        dispatch(setSelectedProduct(items)) 
                                                    )}
                                                >
                                                    <TrashIcon className='w-4 hover:text-red-500' />
                                                </IconButton>
                                                
                                            </div>
                                        </td> */}

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

export default SoldProductList