import React, { Fragment } from 'react'
import Header from '../../components/Header'
import { useSelector } from 'react-redux'
import { selectIsLoading, selectIsPrint, setisPrint } from '../../app/slices/uiSlice'
import AppPopOver from '../../components/global/AppPopOver'
import SalesReceipt from '../../components/SalesReceipt'
import { useDispatch } from 'react-redux'
import DrawerMenu from '../../components/DrawerMenu'
import { useState } from 'react'
import { SearchIcon } from '@heroicons/react/outline'
import { IconButton } from '@mui/material'
import { getCategories, getProductOrderList, getSubCategories } from '../../appHooks/productHook'
import { useEffect } from 'react'
import { selectProductOrderList } from '../../app/slices/productSlice'
import { selectCategorys, selectSubCategorys } from '../../app/slices/categorySlice'
import ProductsOrderList from '../../components/ProductsOrderList'

const ProductOrderList = () => {
    const dispatch = useDispatch()
    const isPrint = useSelector(selectIsPrint)
    const categories = useSelector(selectCategorys)
    const subCategories = useSelector(selectSubCategorys)
    const list = useSelector(selectProductOrderList)
    const [query, setQuery] = useState({
        category: '',
        subCategory: ''
    })

    useEffect(() => {
        getCategories(dispatch)
        getSubCategories(dispatch)
    }, [])


    return (
      <Fragment>
        {
            <AppPopOver 
                open={isPrint}
                setOpen={() =>dispatch(setisPrint(false))}
                
                title='Sales Receipt'
            >
                <SalesReceipt />
            </AppPopOver>
        }
        <div className="bg-gray-100 h-screen">
           
            <Header /> 
            
            <main className='grid grid-cols-1 md:grid-cols-2
                md: max-w-3xl xl:grid-cols-7 xl:max-w-full mx-auto shadow-md px-0 h-full overflow-hidden'>
                <div className='hidden xl:inline-grid col-span-1 overflow-auto scrollbar-none px-0 h-full bg-white'
                >
                    <DrawerMenu />
                    {/* <PostingAnalysis /> */}
                </div>
            
                <section className="col-span-6 overflow-y-auto pb-20 h-[100%] overflow-auto scrollbar-none">
                    <div className='flex w-[50%] mx-auto py-4 justify-between'>
                        <div className='mr-2'>
                           <p>Category</p>
                            <select 
                                name="category" 
                                id="category"
                                onChange={e =>setQuery({
                                    ...query,
                                    category: e.target.value
                                })}
                                className='outline-none border-0 focus:ring-0 shadow-sm rounded-md'
                            >
                                <option value="all">All</option>
                                {
                                    categories?.length > 0 &&
                                    categories?.map(item => {
                                        const { _id, name } = item
                                        return (
                                            <Fragment
                                                key={_id}
                                            >
                                                <option value={_id}> {name} </option>
                                            </Fragment>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <p>Sub-Category</p>
                           
                            <select 
                                name="subCategory" 
                                id="subCategory"
                                onChange={e =>setQuery({
                                    ...query,
                                    subCategory: e.target.value
                                })}
                                className='outline-none border-0 focus:ring-0 shadow-sm rounded-md'
                            >
                                {
                                    subCategories?.length > 0 &&
                                    subCategories?.map(item => {
                                        const { _id, name } = item
                                        return (
                                            <Fragment
                                                key={_id}
                                            >
                                                <option value={_id}> {name} </option>
                                            </Fragment>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='mx-2'>
                            <p>Search</p>
                            <IconButton
                                onClick={() =>getProductOrderList(dispatch, query.category, query.subCategory)}
                            >
                                <SearchIcon className='w-6' />
                            </IconButton>
                        </div>
                   </div>
                   <div className='flex'>
                       {
                        list?.length > 0 &&
                           <ProductsOrderList />
                       }
                   </div>
                </section>
            </main>
        </div>
      </Fragment>
        
    )
}

export default ProductOrderList
