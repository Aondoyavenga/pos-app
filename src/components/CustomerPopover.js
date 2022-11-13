import React, { Fragment, useEffect, useState} from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
    XIcon,
  } from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts, setSelectedProduct } from '../app/slices/productSlice'
import { selectCustomers, setSelectedCustomer } from '../app/slices/customerSlice'
import { getAllProducts } from '../appHooks/productHook'
import { IconButton } from '@mui/material'
  
function classNames(...classes) {
return classes.filter(Boolean).join(' ')
}


const InPutText = ({search, onClick, setSearch, placeholder}) =>{
    return (
        <input 
            type="text" 
            value={search}
            onChange={e =>setSearch(e.target.value)}
            placeholder={placeholder}
            className='border-0 bg-white w-full rounded-sm
                outline-none hover:ring-0 focus:ring-0 h-[100%]
            '
            onClick={() =>onClick()}
        />
    )
}

const CustomerPopover = ({search, setSearch, product, customer, setCustomer}) => {
    const dispatch = useDispatch()
    const products = useSelector(selectProducts)
    const customers = useSelector(selectCustomers)
    const [open, setOpen] = useState(false)

    function handleClick() {
        setOpen(true)
       
    }
    useEffect(() => {
       getAllProducts(dispatch)
    },[])

    return (
        <>
        
            <Popover.Group>
            {
                
                <InPutText 
                    value={search ? search : customer}
                    setSearch={!search && !product? setCustomer : setSearch}
                    onClick={handleClick}
                    placeholder={!search && !product ? 'Search by name' : 'Search by SKU/UPC number or product name' }
                />
            }

            <Popover className="relative">
              {() => (
                <>

                  <Transition
                    as={Fragment}
                    show={open}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div
                            className='flex bg-white justify-between items-center px-4'
                        >
                            <p>{!search && !product ? 'Customer List' : 'Product List'}</p>
                            <IconButton
                                onClick={() =>setOpen(false)}
                            >
                                <XIcon className='w-6 text-red-500' />
                            </IconButton>
                        </div>
                        {
                            product ?
                                
                                <div className="relative grid gap-2 bg-white px-5 py-6 sm:gap-8 sm:p-8">

                                    {
                                        products?.length > 0 &&
                                        products?.filter(item => {
                                            if(search === '') {
                                                return item
                                            }else if(item.productName?.toLowerCase()?.includes(search?.toLowerCase())){
                                                return item
                                            }else if(item.SKU_UPC?.includes(search)) return item

                                        }).map((item) => (
                                            <div
                                            key={item._id}
                                            onClick={() =>(
                                                setSearch(''),
                                                dispatch(setSelectedProduct(item))
                                            )}
                                            className="-m-3 px-2 p-1 flex items-start rounded-sm hover:bg-gray-50"
                                            >
                                            <div>
                                                <p className="text-base text-md text-gray-900 cursor-pointer">{item.productName}</p>
                                                <p className="mt-1 text-left text-sm text-pos_color-green cursor-pointer">{item.SKU_UPC}</p>
                                            </div>
                                            </div>
                                        ))
                                    }
                                    
                                </div>
                            :
                            <div className="relative grid gap-2 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                {
                                    customers?.length > 0 &&
                                    customers?.filter(item => {
                                        if(customer == '') {
                                            return item
                                        }else if(item.firstName?.toLowerCase()?.includes(customer)){
                                            return item
                                        }else if(item.lastName?.toLowerCase()?.includes(customer)) return item

                                    }).map((item) => (
                                        <div
                                        key={item._id}
                                        onClick={() =>(
                                            dispatch(setSelectedCustomer(item)),
                                            setCustomer(`${item.firstName}`),
                                            setOpen(false),
                                            setSearch('')
                                        )}
                                        className="-m-3 p-1 flex items-start rounded-sm hover:bg-gray-50"
                                        >
                                            <div className="ml-4">
                                                <p className="text-base text-gray-900 cursor-pointer">{`${item.firstName} ${item.lastName}`}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        }
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
            </Popover.Group>
        </>

    )
}

export default CustomerPopover
