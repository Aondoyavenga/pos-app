import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { selectError, selectIsLoading, selectSuccess, setError, setSuccess } from '../app/slices/uiSlice'
import DrawerMenu from './DrawerMenu'
import TransitionAlerts from './global/AppAlert'
import { IconButton } from '@mui/material'
import { XIcon } from '@heroicons/react/solid'
import { selectSelectedCategory, setSelectedCategory } from '../app/slices/categorySlice'
import CategoryList from './CategoryList'
import { addCategory } from '../appHooks/categoryHook'


const CategoriesFeed = () => {
    const dispatch = useDispatch()
    const Error = useSelector(selectError)
    const success = useSelector(selectSuccess)
    const [open, setOpen] = useState(false)
    const [action, setAction] = useState('')
    const isLoading = useSelector(selectIsLoading)
    const category = useSelector(selectSelectedCategory)
    const [body, setBody] = useState({
        _id:'',
        name: '',
        action: '',
    })
  
    const handleCreate = e => {
        e.preventDefault() 
        dispatch(setError(null))
        dispatch(setSuccess(null))

        setOpen(false)
        const { name } = body
        if(!name) return( setOpen(true),
            dispatch(setError('Name is required')))
       
        dispatch(setError(null))
        setOpen(false)
        addCategory( '/category', body, dispatch)
    }

    useEffect(() => {
        if(!category) return setBody({
            _id: '',
            action: '',
            name: ''
        })
        setBody({

            ...body,
            ...category,
            action: action
        })
    
    }, [category])

    useEffect(() => {
        setOpen(true)
        setBody({
            _id:'',
            name: '',
            action: '',
        })
    }, [success])

    return (
        <Fragment>
            <main className='flex flex-row mx-auto shadow-md px-0 h-[85%]'>
            <div className='xl:inline-grid col-span-1 overflow-auto scrollbar-none px-0 h-full bg-white'
            >
                <DrawerMenu />
               
            </div>
           
            <section className="flex-1 overflow-y-auto pb-20 h-[100%] overflow-auto scrollbar-none">
                <div className='xl:inline-grid md:col-span-6 flex items-center justify-center w-full
                    py-2
                '
                >
                   <h1
                        className='text-pos_color font-bold text-lg'
                   >POINT OF SALE CATEGORY / SUB-CATEGORY</h1>
                </div>
                <main className='grid grid-cols-8 md:grid-cols-8 h-full text-xs'>
                    
                     <div className=' xl:inline-grid md:col-span-6
                        top-2 sticky overflow-auto scrollbar-none flex-1'>
                        <section>
                            <div
                                className='py-2 px-3'
                            >
                               <CategoryList 
                                    setAction={setAction}
                               />
                            </div>
                        </section>
                    </div>
                    <div className=' xl:inline-grid md:col-span-2
                        top-2 sticky overflow-auto scrollbar-none'>
                        <div className='flex-1 w-full  
                            scrollbar-none h-full flex justify-center px-2'
                        >
                            <form action=""
                                className='flex flex-col mt-8'
                            >
                                {
                                    success &&
                                    <TransitionAlerts 
                                            open={open}
                                            title='Pay'
                                            setOpen={setOpen} 
                                            success message={success} 
                                        />
                                }
                                {
                                    Error &&
                                    <TransitionAlerts 
                                            Error
                                            open={open}
                                            message={Error}
                                            setOpen={setOpen}
                                        />
                                }
                                <h3
                                    className={`text-lg font-semibold ${action == 'Delete' ? 'text-red-500' : 'text-pos_color py-2'}`}
                                >{ action == 'Delete' ? `Delete ${body.name}` : 'Create Category'}</h3>
                               <span>Name</span>
                               <input 
                                    type="text" 
                                    name="firstName"
                                    value={body.name}
                                    placeholder='Category Name'
                                    onChange={e =>setBody({
                                        ...body,
                                        name: e.target.value
                                    })}
                                    className='w-full focus:ring-0 hover:ring-0 rounded my-2 text-xs'
                                />
                               
                                <div className="flex items-center justify-between gap-2">
                                   
                                    {
                                        action == 'Delete' ?
                                        <button
                                        onClick={handleCreate}
                                            disabled={isLoading}
                                            className='py-3 my-2 px-2 w-full text-white text-sm rounded-md 
                                            shadow-md bg-red-500 hover:bg-pos_color-green transition-all duration-150'
                                        > {isLoading ? 'Deleting...': 'Are sure you want to delete ?'} </button>
                                        :
                                        <button
                                            onClick={handleCreate}
                                            disabled={isLoading}
                                            className='py-3 my-2 w-full text-white text-sm rounded-md 
                                            shadow-md bg-pos_color hover:bg-pos_color-green transition-all duration-150'
                                        > {isLoading ? 'Creating...': action == 'Edit' ? 'Edit' : 'Create'} </button>
                                    }

                                    { 
                                        body._id &&
                                        <IconButton
                                            size='small'
                                            onClick={() =>(
                                                setAction(''),
                                                dispatch(setSelectedCategory(null))
                                            )}
                                        >
                                            <XIcon className='w-6' />
                                        </IconButton>
                                    }
                                </div>
                           </form>
                           
                        </div>
                    </div>
                </main>
                
            </section>

           
        </main>
        </Fragment>
    )
}

export default CategoriesFeed
