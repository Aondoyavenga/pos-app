import React, { Fragment, useState } from 'react'
import DrawerMenu from './DrawerMenu'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { selectError, selectIsLoading, selectSuccess, setError, setIsLoading, setSuccess } from '../app/slices/uiSlice'
import { useSelector } from 'react-redux'
import { selectProductList } from '../app/slices/productSlice'
import { useLayoutEffect } from 'react'
import { getAllProducts } from '../appHooks/productHook'
import { selectToken } from '../app/slices/userSlice'
import { IconButton } from '@mui/material'
import { SearchIcon } from '@heroicons/react/outline'
import { getSoldProducts } from '../appHooks/orderHook'
import SoldProductList from './SoldProductList'

const SaleReportFeed = ({cashier}) => {
    const dispatch = useDispatch()
    const Error = useSelector(selectError)
    const success = useSelector(selectSuccess)
    const [search, setSearch] = useState('')
    const [isAdd, setIsAdd] = useState('')
    const token = useSelector(selectToken)
    const products = useSelector(selectProductList)
    const isLoading = useSelector(selectIsLoading)

    const [query, setQuery] = useState({
        page: 1,
        limit: 100,
        endDate: '',
        product: '',
        startDate: '',
    })

    const handleChange = e => {
        const {name, value} = e.target

        setQuery({
            ...query,
            [name]: value
        })
    }

    
    const getSolProducts = e => {
        const { endDate, startDate, product } = query
        getSoldProducts(dispatch, startDate, endDate, product)
    }


    const getItems = async () =>{
        const { page, limit } = query
      
        setIsAdd('')
        
        if(!token) return
        if(cashier) {
            return getAllProducts(dispatch)
        }

        getAllProducts(dispatch, page, limit )
    }

    useEffect(() => {
        
       getItems()
    },[success, token])

    
    useLayoutEffect(() => {
        setIsAdd('')
        dispatch(setError(null))
        dispatch(setSuccess(false))
    }, [])
    return (
        <Fragment>
            <main className='flex flex-row  shadow-md px-0 h-[89%] overflow-hidden'>
            
            {
                !cashier &&
                <div className='xl:inline-grid col-span-1 overflow-auto scrollbar-none px-0 h-full bg-white'
                >
                    <DrawerMenu />
                    {/* <PostingAnalysis /> */}
                </div>
            }
           
            <section className={`flex-1 overflow-y-auto pb-20 scrollbar-none`}>
                <div className='flex items-center flex-col justify-center w-full
                    py-2
                '
                >
                   
                    {
                        !cashier &&
                            
                        <main className=' transition-all duration-150 md:w-[95%] sm:w-[95%] mx-auto px-2 py-2 mt-4'>
                                {
                                    products &&
                                    <Fragment>
                                        <div
                                            className='flex md:flex-col lg:flex-row sm:flex-col justify-between items-center gap-4 py-2 my-2'                                
                                        >
                                            <h3
                                                className='font-semibold text-xl'   
                                            >Sales</h3>
                                            <div
                                                className='flex-1 flex justify-start'
                                            >
                                                <div
                                                    className='bg-gray-100 flex-1 h-8 text-xs shadow rounded-md'
                                                >
                                                    <select 
                                                        name="product"
                                                        value={query.product}
                                                        onChange={e =>handleChange(e)}
                                                        className='border-0 bg-transparent w-full
                                                            outline-none hover:ring-0 focus:ring-0 text-xs'
                                                    >
                                                        <option value=""></option>
                                                        {
                                                            products?.products?.map(item =>{
                                                                const { _id, productName } = item
                                                                return (
                                                                    <Fragment key={_id}>
                                                                        <option value={_id}> {productName} </option>
                                                                    </Fragment>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                               
                                            </div>
                                            <div className='flex gap-2 flex-1 items-center text-xs'>
                                                <p>From</p>
                                                <div
                                                    className='bg-gray-100 flex-1 h-8 text-xs shadow rounded-md'
                                                >
                                                    <input 
                                                        type="date" 
                                                        name='startDate'
                                                        value={query.startDate}
                                                        onChange={e =>handleChange(e)}
                                                        placeholder='Search by SKU/UPC, Name, Price...'
                                                        className='border-0 bg-transparent w-full
                                                            outline-none hover:ring-0 focus:ring-0 text-xs
                                                        '
                                                    />
                                                </div> 
                                                <p>To</p>
                                                
                                                <div
                                                    className='bg-gray-100 flex-1 h-8 text-xs shadow rounded-md'
                                                >
                                                    <input 
                                                        type="date" 
                                                        name='endDate'
                                                        value={query.endDate}
                                                        onChange={e =>handleChange(e)}
                                                        placeholder='Search by SKU/UPC, Name, Price...'
                                                        className='border-0 bg-transparent w-full
                                                            outline-none hover:ring-0 focus:ring-0 text-xs
                                                        '
                                                    />
                                                </div>
                                                <div
                                                    onClick={getSolProducts}
                                                    className='bg-pos_color flex-1 h-8 text-xs shadow 
                                                    rounded-md hover:shadow-md'
                                                    
                                                >
                                                    <IconButton
                                                        size='small'
                                                    >
                                                        <SearchIcon className='w-5 text-white' />
                                                    </IconButton>
                                                </div>
                                            </div>
                                            <section
                                                className='flex-1 flex justify-end'
                                            >                                   
                                                <div
                                                    className='bg-gray-100 flex-1 h-8 text-xs shadow rounded-md'
                                                >
                                                    <input 
                                                        type="text" 
                                                        value={search}
                                                        onChange={e =>setSearch(e.target.value)}
                                                        placeholder='Search by SKU/UPC, Name, Price...'
                                                        className='border-0 bg-transparent w-full
                                                            outline-none hover:ring-0 focus:ring-0 text-xs
                                                        '
                                                    />
                                                </div> 
                                            </section>

                                        </div>
                                        {
                                            products?.length > 0 &&
                                            <SoldProductList 
                                                query={query}
                                                search={search}
                                                setQuery={setQuery}
                                                setIsAdd={() =>setIsAdd('product')}
                                            /> 
                                        }
                                    </Fragment>
                                    
                                }
                        </main>
                    }
                </div>
                <div className='md:py-48 mb-16' />
                
            </section>

           
        </main>
        </Fragment>
    )
}

export default SaleReportFeed
