import React, { Fragment, useState } from 'react'
import DrawerMenu from './DrawerMenu'
import { useDispatch } from 'react-redux'
import { selectError, selectSuccess } from '../app/slices/uiSlice'
import { useSelector } from 'react-redux'
import { BadgeCheckIcon, BookOpenIcon, ShoppingBagIcon, ShoppingCartIcon, TagIcon } from '@heroicons/react/solid'
import { Button, } from '@mui/material'
import { getOrderReport } from '../appHooks/orderHook'
import OrderList from './OrderList'

const ProductFeed = () => {
    const dispatch = useDispatch()
   
    const [search, setSearch] = useState('')   
    const [products, setProducts] = useState([])
   
    return (
        <Fragment>
            <main className='flex  mx-auto  px-0 h-[85%]'>
            <div className='xl:inline-grid col-span-1 overflow-auto scrollbar-none px-0  bg-white'
            >
                <DrawerMenu />
                {/* <PostingAnalysis /> */}
            </div>
           
            <section className="flex-1 overflow-y-auto pb-20 h-[100%] overflow-auto scrollbar-none">
                <div className='flex items-center flex-col justify-center w-full
                    py-2 text-xs
                '
                >
                    <h1
                        className='text-pos_color font-bold text-2xl'
                    >REPORTS</h1>
                    <section className=' transition-all duration-150 md:w-[95%] sm:w-[90%] mx-auto px-2 py-2 mt-4'>
                        <div
                            className='flex justify-between gap-2'
                        >
                            <button
                                onClick={() => getOrderReport('/orders', dispatch)}
                                className='flex items-center rounded-md  bg-pos_color text-white px-10 shadow-md hover:shadow-lg'
                            >All <TagIcon className='w-6' /> </button>
                             <button
                                onClick={() => getOrderReport('/orders/ordertype/sales', dispatch)}
                                className='flex items-center py-3 rounded-md  bg-pos_color-green text-white px-10 shadow-md hover:shadow-lg'
                            >Sales <ShoppingCartIcon className='w-6' /> </button>
                             <button
                                onClick={() => getOrderReport('/orders/ordertype/purchase', dispatch)}
                                className='flex items-center py-3 rounded-md  bg-pos_color text-white px-10 shadow-md hover:shadow-lg'
                            >Purchase <ShoppingBagIcon className='w-6' /> </button>

                            <button
                                onClick={() => getOrderReport('/orders/orderstatus/Open', dispatch)}
                                className='flex items-center py-3 rounded-md bg-[orange] text-white px-10 shadow-md hover:shadow-lg'
                            >Open <BookOpenIcon className='w-6' /> </button>
                             <button
                                onClick={() => getOrderReport('/orders/orderstatus/Paid', dispatch)}
                                className='flex items-center py-3 rounded-md  bg-pos_color text-white px-10 shadow-md hover:shadow-lg'
                            >Paid <BadgeCheckIcon className='w-6'/> </button>
                        </div>
                    </section>
                   <main className='transition-all duration-150 text-xs md:w-[95%] sm:w-[95%] mx-auto px-2 py-2 mt-4'>
                        {
                            products &&
                            <Fragment>
                                <div
                                    className='flex justify-between items-center py-2'                                
                                >
                                   <h3
                                        className='font-semibold text-xl flex-1'   
                                    >Report List</h3>
                                    

                                </div>
                                <OrderList 
                                    search={search}
                                    products={products}  
                                /> 
                            </Fragment>
                            
                        }
                        <div className='md:py-48 mb-4' />
                   </main>
                </div>
                
                
            </section>

           
        </main>
        </Fragment>
    )
}



export default ProductFeed
