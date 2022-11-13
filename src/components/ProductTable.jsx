import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { IconButton } from '@mui/material'
import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectProductList, setSelectedProduct } from '../app/slices/productSlice'
import { setError, setSuccess } from '../app/slices/uiSlice'

const ProductTable = ({search, query, setQuery, setIsAdd, setDelete}) => {
    const dispatch = useDispatch()
    const products = useSelector(selectProductList)
  return (
        <Fragment>
           
            <table
                className='table w-full'
            >
                <thead>
                    <Fragment>
                    <th className='text-sm'>S/N</th>
                    <th className='text-sm'>SKU/UPC</th>
                    <th className='text-sm'>Product Name</th>
                    <th className='text-sm'>Category</th>
                    <th className='text-sm'>Sub-Category</th>
                    <th className='text-sm'>Qty</th>
                    <th className='text-sm'>Pur. Price (<strike>N</strike>)</th>
                    <th className='text-sm'>Sales Price (<strike>N</strike>)</th>
                    <th></th>
                    </Fragment>
                </thead>

                <tbody>
                    {
                        products?.length > 0 &&
                        products?.products?.filter(item =>{
                            if(search == '' ){
                                return item
                            }else if(item.SKU_UPC?.toString()?.includes(search)) {
                                return item
                            }else if(item.productName?.toLowerCase()?.includes(search?.toLowerCase())){
                                return item
                            }else if(item.purchasePrice?.toString()?.includes(search?.toLowerCase())){
                                return item
                            }else if(item.salesPrice?.toString()?.includes(search?.toLowerCase())){
                                return item
                            }
                        })
                        .map((items, index) => {
                            const { SKU_UPC, category, subCategory, purchasePrice, salesPrice, productName, quantity} = items

                            return(
                                <Fragment
                                    key={index*876}
                                >
                                    <tr
                                        className={ index % 2 ? 'bg-gray-100' : 'bg-white'}
                                    >
                                        <td className='cursor-default text-sm text-center text-pos_color-green'> {index+1} </td>
                                        <td className='cursor-default text-sm text-center'> {SKU_UPC} </td>
                                        <td className='cursor-default text-sm line-clamp-1 text-center'> {productName} </td>
                                        <td className='cursor-default text-sm text-center'> {category?.name} </td>
                                        <td className='cursor-default text-sm text-center line-clamp-1'> {subCategory?.name} </td>
                                        <td className='cursor-default text-sm text-center'> {quantity} </td>
                                        <td className='cursor-default text-sm text-center text-red-500'> 
                                            {purchasePrice?.toLocaleString()} 
                                        </td>
                                        <td className='cursor-default text-sm text-center text-pos_color-green'> 
                                            {salesPrice?.toLocaleString()} 
                                        </td>
                                        <td className='cursor-default text-sm text-center'>
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
                                                    <PencilAltIcon className='w-5 hover:text-pos_color-green' />
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
                                                    <TrashIcon className='w-5 hover:text-red-500' />
                                                </IconButton>
                                                
                                            </div>
                                        </td>
                                    </tr>
                                </Fragment>
                            )
                        })
                    }
                    <tr className='py-3 bg-pos_color text-white sticky z-30 -bottom-20 top-0'>
                        <td colSpan={9}>
                            <div
                                className='flex justify-center w-full pb-2 '
                            >
                                <div className='flex justify-between '>
                                    <div>
                                        <IconButton
                                            size='small'
                                            onClick={() =>setQuery({
                                                ...query,
                                                page: query?.page - 1
                                            })}
                                            disabled={  query?.page === 1}
                                        >
                                            <ChevronLeftIcon className='w-6 text-white' />
                                        </IconButton>
                                    </div>
                                    <div className='flex items-center'>
                                        <p className='font-semibold cursor-pointer px-2'>{query?.page}</p> {`/`} 
                                        <p className='font-semibold cursor-pointer px-2'> {parseInt(products?.pages)} </p>
                                    </div>
                                    <div>
                                        <IconButton
                                            size='small'
                                            onClick={() =>setQuery({
                                                ...query,
                                                page: query?.page + 1
                                            })}
                                            disabled={  products?.products?.length <=0 }
                                        >
                                            <ChevronRightIcon className='w-6 text-white' />
                                        </IconButton>
                                    </div>
                                    <div className='flex items-center'>
                                        <input type="number" 
                                            value={query?.limit}
                                            placeholder='limit'
                                            onChange={e =>setQuery({
                                                ...query,
                                                limit: e.target.value
                                            })}
                                            className='h-[30px] border-none outline-none 
                                            rounded-sm mx-2
                                            focus:ring-0 text-black'
                                        />
                                    </div>
                                </div>

                            </div>
                        </td>
                    </tr>
                </tbody>
                

            </table>
           
        </Fragment>
  )
}

export default ProductTable