import React, { Fragment, useState } from 'react'
import DrawerMenu from './DrawerMenu'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { selectError, selectIsLoading, selectSuccess, setError, setIsLoading, setSuccess } from '../app/slices/uiSlice'
import { useSelector } from 'react-redux'
import ProductTable from './ProductTable'
import { PlusCircleIcon, XCircleIcon, XIcon } from '@heroicons/react/solid'
import { Button, IconButton } from '@mui/material'
import { addCategory } from '../appHooks/categoryHook'
import { selectProductList, selectSelectedProduct, setSelectedProduct } from '../app/slices/productSlice'
import { useLayoutEffect } from 'react'
import { getAllProducts } from '../appHooks/productHook'
import { selectToken } from '../app/slices/userSlice'

const ProductFeed = () => {
    const dispatch = useDispatch()
    const Error = useSelector(selectError)
    const success = useSelector(selectSuccess)
    const [add, setAdd] = useState('product')
    const [search, setSearch] = useState('')
    const [isAdd, setIsAdd] = useState('')
    const token = useSelector(selectToken)
    const [catbody, setCatbody] = useState('')
    const products = useSelector(selectProductList)
    const [categorys, setCategorys] = useState([])
    const isLoading = useSelector(selectIsLoading)
    const [subcategorys, setSubcategorys] = useState([])
    const selectedProduct = useSelector(selectSelectedProduct)

    const [query, setQuery] = useState({
        page: 1,
        limit: 100
    })

    const [body, setBody] = useState({
        _id: '',
        SKU_UPC: '',
        category: '',
        discount: '',
        isDelete: false,
        productName: '',
        subCategory: '',
        salesPrice: '',
        purchasePrice: '',
    })
    const handleChange = e => {
        const {name, value} = e.target 
        setBody({
            ...body,
            [name]: value
        })

        if(name == 'category'){
            const selectCategorie = categorys?.find(item =>item._id == value)
           const daa = selectCategorie?.subCategory
           setSubcategorys(daa)
        }
    }

    const setDelete = (value) => {
        setBody({
            ...body,
            isDelete: value
        })
    }

    const handlePost = async() => {
        try {
            dispatch(setError(null))
            dispatch(setSuccess(null))
            dispatch(setIsLoading(true))
            const { data, status } = await axios.post('/product', body)
            if(status == 201) return(
                dispatch(setSuccess(data.message)),
                dispatch(setIsLoading(false)),
                setBody({
                    _id: '',
                    SKU_UPC: '',
                    category: '',
                    discount: '',
                    isDelete: false,
                    productName: '',
                    subCategory: '',
                    salesPrice: '',
                    purchasePrice: '',
                })

            ),
            dispatch(setSelectedProduct(null))
            dispatch(setError(data?.message))
        } catch (error) {
            dispatch(setIsLoading(false))
            if(error) return dispatch(setError(error.response?.data?.message))
        }
    }

    const getItems = async () =>{
        const { page, limit } = query
        const categorys1 = await axios.get('/category')
        const subcategorys1 = await axios.get('/subcategory')
      
        setIsAdd('')
        setCategorys(categorys1.data)
        
        setSubcategorys(subcategorys1.data)
        if(!token) return
        getAllProducts(dispatch, page, limit )
    }

    useEffect(() => {
        
       getItems()
    },[success, token])

    useEffect(() => {
        const { page, limit } = query
        getAllProducts(dispatch, page, limit )
    }, [query])
    

    useEffect(() => {
        if(!selectedProduct) return
        const {
        _id,
        SKU_UPC,
        category,
        discount,
        productName,
        subCategory,
        salesPrice,
        purchasePrice,} = selectedProduct
        setBody({
            _id: _id,
            SKU_UPC: SKU_UPC,
            category: category,
            discount: discount,
            productName: productName,
            subCategory: subCategory,
            salesPrice: salesPrice,
            purchasePrice: purchasePrice? purchasePrice: '',
            salesPrice: selectedProduct?.salesPrice,
            category: selectedProduct?.category?._id,
            subCategory: selectedProduct?.subCategory?._id
        })
        
    }, [selectedProduct])
    useLayoutEffect(() => {
        setIsAdd('')
        dispatch(setError(null))
        dispatch(setSuccess(false))
    }, [])
    return (
        <Fragment>
            <main className='grid grid-cols-1 md:grid-cols-2
            md: max-w-3xl xl:grid-cols-7 xl:max-w-full mx-auto shadow-md px-0 h-[89%] overflow-hidden'>
            <div className='hidden xl:inline-grid col-span-1 overflow-auto scrollbar-none px-0 h-full bg-white'
            >
                <DrawerMenu />
                {/* <PostingAnalysis /> */}
            </div>
           
            <section className="col-span-6 overflow-y-auto pb-20 h-[100%] overflow-auto scrollbar-none">
                <div className='flex items-center flex-col justify-center w-full
                    py-2
                '
                >
                    <h1
                        className='text-pos_color font-bold text-2xl'
                    >PRODUCTS</h1>
                    {

                        add == 'product' &&
                   
                        <main className='shadow md:w-[95%] sm:w-[95%] mx-auto px-2 py-2 mt-4 transition-all duration-150'>
                        {
                            Error &&
                            <div
                                    className='bg-red-500 text-white py-2 px-2 w-full'
                            >
                                <p> {Error} </p>
                            </div>
                        }
                        {
                            success &&
                            <div
                                    className='bg-pos_color-green text-white py-2 px-2 w-full'
                            >
                                <p> {success} </p>
                            </div>
                        }
                            <div
                                className='flex md:flex-row sm:flex-col gap-2'
                            >
                                <div className="flex flex-1 flex-col">
                                    <span>Name</span>
                                    <input type="text" 
                                        name='productName'
                                        placeholder='Product Name'
                                        value={body.productName}
                                        onChange={e =>handleChange(e)}
                                        className='bg-gray-50 block w-full px-2 
                                        sm:text-sm rounded-md focus:ring-black focus:border-black my-5'
                                    />
                                </div>
                                <div className="flex flex-1 flex-col">
                                    <span>SKU/UPC</span>
                                    <input type="text" 
                                        name='SKU_UPC'
                                        value={body.SKU_UPC}
                                        placeholder='SKU/UPC'
                                        onChange={e =>handleChange(e)}
                                        className='bg-gray-50 block w-full px-2 
                                        sm:text-sm rounded-md focus:ring-black focus:border-black my-5'
                                    />
                                </div>
                            
                            </div>
                            <div
                                className='flex md:flex-row sm:flex-col gap-2'
                            >
                            
                                <div className="flex flex-1 flex-col">
                                    <div className='flex gap-2 items-center'>
                                        <span>Category</span>

                                        { isAdd !== 'category' ?
                                            <IconButton
                                                size='small'
                                                onClick={() =>setIsAdd('category')}
                                            >
                                                <PlusCircleIcon className='w-6 hover:text-pos_color-green' />
                                            </IconButton>
                                            :
                                            <IconButton
                                                size='small'
                                                onClick={() =>setIsAdd('')}
                                            >
                                                <XCircleIcon className='w-6 hover:text-pos_color-green' />
                                            </IconButton>
                                        }
                                        {
                                            isAdd =='category' &&
                                            <Fragment>
                                                <input type="text" 
                                                    name='category'
                                                    placeholder='Category'
                                                    onChange={e =>setCatbody(e.target.value)}
                                                    className='bg-gray-50 block w-full 
                                                    sm:text-sm rounded-md focus:ring-black focus:border-black my-5'
                                                />
                                                <Button
                                                    disabled={isLoading}
                                                    onClick={() =>addCategory('/category', {name: catbody, action:false, _id: null}, dispatch)}
                                                    className='bg-pos_color shadow-md text-white'
                                                >Save</Button>
                                            </Fragment>
                                        }
                                    </div>

                                    { isAdd !=='category' &&
                                        <select 
                                            name='category'
                                            value={body.category}
                                            onChange={e =>handleChange(e)}
                                            className='bg-gray-50 block w-full px-2 
                                            sm:text-sm rounded-md focus:ring-black focus:border-black my-3'
                                        >
                                            <option value="">Product Category</option>
                                            {
                                                categorys?.length > 0 &&
                                                categorys?.map((item, index) => {
                                                    const {_id, name } = item
                                                    return (
                                                        <Fragment
                                                            key={index*654}
                                                        >
                                                            <option value={_id} > {name} </option>
                                                        </Fragment>
                                                    )
                                                })
                                            }

                                        </select>
                                    }

                                </div>
                                <div className="flex flex-1 flex-col">
                                   
                                    <div className='flex gap-2 items-center'>
                                        <span>Sub-Category</span>

                                        { isAdd !== 'subcategory' ?
                                            <IconButton
                                                size='small'
                                                onClick={() =>setIsAdd('subcategory')}
                                            >
                                                <PlusCircleIcon className='w-6 hover:text-pos_color-green' />
                                            </IconButton>
                                            :
                                            <IconButton
                                                size='small'
                                                onClick={() =>setIsAdd('')}
                                            >
                                                <XCircleIcon className='w-6 hover:text-pos_color-green' />
                                            </IconButton>
                                        }
                                        {
                                            isAdd =='subcategory' &&
                                            <Fragment>
                                                 <select 
                                                    name='subCategory'
                                                    value={body.subCategory}
                                                    onChange={e =>handleChange(e)}
                                                    className='bg-gray-50 block w-full px-2 
                                                    sm:text-sm rounded-md focus:ring-black focus:border-black my-3'
                                                >
                                                    <option value="">Product Category</option>
                                                    {
                                                        categorys?.length > 0 &&
                                                        categorys?.map((item, index) => {
                                                            const {_id, name } = item
                                                            return (
                                                                <Fragment
                                                                    key={index*654}
                                                                >
                                                                    <option value={_id} > {name} </option>
                                                                </Fragment>
                                                            )
                                                        })
                                                    }

                                                </select>
                                                <input type="text" 
                                                    name='subcategory'
                                                    placeholder='Category'
                                                    onChange={e =>setCatbody(e.target.value)}
                                                    className='bg-gray-50 block w-full 
                                                    sm:text-sm rounded-md focus:ring-black focus:border-black my-3'
                                                />
                                                {   body.subCategory && catbody &&
                                                    <Button
                                                        disabled={isLoading}
                                                        className='bg-pos_color shadow-md text-white'
                                                        onClick={() =>addCategory('/subcategory', {name: catbody, categoryRef: body.subCategory}, dispatch)}
                                                    >Save</Button>
                                                }
                                            </Fragment>
                                        }
                                    </div>
                                        { isAdd !== 'subcategory' &&
                                        <select 
                                            name='subCategory'
                                            value={body.subCategory}
                                            onChange={e =>handleChange(e)}
                                            className='bg-gray-50 block w-full px-2 
                                            sm:text-sm rounded-md focus:ring-black focus:border-black my-3'
                                        >
                                            <option value="">Product Sub-Category</option>
                                            {
                                                subcategorys?.length > 0 &&
                                                subcategorys?.map((item, index) => {
                                                    const {_id, name } = item
                                                    return (
                                                        <Fragment
                                                            key={index*654}
                                                        >
                                                            <option value={_id} > {name} </option>
                                                        </Fragment>
                                                    )
                                                })
                                            }

                                        </select>
                                        }
                                </div>
                            </div>

                            <div
                                className='flex md:flex-row sm:flex-col gap-2'
                            >
                                <div className="flex flex-1 flex-col">
                                    <span>Purchase Price</span>
                                    <input type="number"
                                        min={1} 
                                        name='purchasePrice'
                                        placeholder='Product Purchase Price'
                                        value={body.purchasePrice}
                                        onChange={e =>handleChange(e)}
                                        className='bg-gray-50 block w-full px-2 
                                        sm:text-sm rounded-md focus:ring-black focus:border-black my-5'
                                    />
                                </div>
                                <div className="flex flex-1 flex-col">
                                    <span>Sales Price</span>
                                    <input type="number"
                                        min={1} 
                                        name='salesPrice'
                                        value={body.salesPrice}
                                        placeholder='Selling Price'
                                        onChange={e =>handleChange(e)}
                                        className='bg-gray-50 block w-full px-2 
                                        sm:text-sm rounded-md focus:ring-black focus:border-black my-5'
                                    />
                                </div>
                                <div className="flex flex-1 flex-col">
                                    <span>Discount %</span>
                                    <input type="number"
                                        min={0} 
                                        name='discount'
                                        value={body.discount}
                                        placeholder='Discount (1.5, 1)'
                                        onChange={e =>handleChange(e)}
                                        className='bg-gray-50 block w-full px-2 
                                        sm:text-sm rounded-md focus:ring-black focus:border-black my-5'
                                    />
                                </div>
                            
                            </div>
                            {
                                body.isDelete &&
                                <p
                                    className='bg-red-500 text-white py-2 rounded px-2 text-sm animate-pulse shadow-md'
                                > Are your sure you want to delete {body.productName} ? 
                                </p>
                            }
                            <div className="py-2 flex flex-1 items-center justify-center">
                                <button
                                    className='bg-pos_color text-white font-semibold Btn py-2 px-6 rounded-md shadow-md
                                        hover:scale-125 transition-all duration-150
                                    '
                                    onClick={handlePost}
                                    disabled={isLoading}
                                >
                                    {isLoading && body?._id && body.isDelete ? 'Deleting...' : isLoading && body?._id && !body.isDelete ? 'Adding...' : body?._id && body.isDelete ? 'Delete' : body?._id && !body.isDelete ?  'Edit': 'Add Product'}
                                </button>
                            </div>
                            
                        </main>
                    }
                   <main className=' transition-all duration-150 md:w-[95%] sm:w-[95%] mx-auto px-2 py-2 mt-4'>
                        {
                            products &&
                            <Fragment>
                                <div
                                    className='flex justify-between items-center py-2'                                
                                >
                                   <h3
                                        className='font-semibold text-xl flex-1'   
                                    >Product List</h3>
                                    <div
                                        className='flex-1 flex justify-start'
                                    >
                                        {
                                            add ?
                                            <XIcon 
                                                className='btn w-6'
                                                onClick={() =>setAdd(!add)}
                                            />
                                            :
                                            <PlusCircleIcon 
                                                className='w-6 btn'
                                                onClick={() =>setAdd('product')}
                                            />
                                        }
                                    </div>
                                    <section
                                        className='flex-1 flex justify-end'
                                    >                                   
                                        <div
                                            className='bg-gray-100 flex-1 rounded-full shadow'
                                        >
                                            <input 
                                                type="text" 
                                                value={search}
                                                onChange={e =>setSearch(e.target.value)}
                                                placeholder='Search by SKU/UPC, Name, Price...'
                                                className='border-0 bg-transparent w-full rounded-full
                                                    outline-none hover:ring-0 focus:ring-0
                                                '
                                            />
                                        </div> 
                                    </section>

                                </div>
                                {
                                    products?.length > 0 &&
                                    <ProductTable 
                                        query={query}
                                        search={search}
                                        setQuery={setQuery}
                                        setDelete={setDelete}  
                                        setIsAdd={() =>setIsAdd('product')}
                                    /> 
                                }
                            </Fragment>
                            
                        }
                   </main>
                </div>
                
                
            </section>

           
        </main>
        </Fragment>
    )
}

export default ProductFeed
