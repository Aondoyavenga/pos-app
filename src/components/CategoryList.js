import { MinusCircleIcon} from '@heroicons/react/outline'
import { PencilAltIcon } from '@heroicons/react/solid'
import { IconButton } from '@mui/material'
import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import {useSelector} from 'react-redux'
import { selectCategorys, setSelectedCategory } from '../app/slices/categorySlice'

const CategoryList = ({setAction}) => {
    const dispatch = useDispatch()
    const categorys = useSelector(selectCategorys)
   
    return (
        <Fragment>
           
            <div
                className='shadow p-2 mt-2 bg-gray-50'
            >
                <h3
                    className='text-lg my-2 font-semibold text-pos_color'
                > Category List </h3>
                {
                    categorys?.length > 0 &&
               
                <table
                    className='w-full table stripped'
                >
                    <thead className='text-xs text-gray-500'>
                        <th>S/N</th>
                        <th>Name's</th>
                        <th>Actions</th>
                    </thead>
                    <tbody className='text-xs'>
                        {
                            categorys?.map((item, index) => {
                                const { status, name, lastName, phoneNumber } = item
                                return (
                                    <Fragment
                                        key={index*4582}
                                    >
                                        <tr
                                            className={index % 2 ? 'bg-gray-100': 'bg-white'}
                                        >
                                            <td className='text-center cursor-pointer text-pos_color-green'> {index+1} </td>
                                            <td className='text-center cursor-pointer'> {`${name}`} </td>
                                            
                                            
                                            <td className='text-center cursor-pointer'>
                                                <div className='flex gap-4'>
                                                    <IconButton
                                                        size='small'
                                                        onClick={() =>(
                                                            setAction('Delete'),
                                                            dispatch(setSelectedCategory(item))
                                                        )}
                                                    >
                                                        <MinusCircleIcon
                                                            className='w-4'
                                                        />
                                                    </IconButton>
                                                    <IconButton
                                                        size='small'
                                                        onClick={() =>(
                                                            setAction('Edit'),
                                                            dispatch(setSelectedCategory(item))
                                                        )}
                                                    >
                                                        <PencilAltIcon 
                                                            className='w-4'
                                                        />
                                                    </IconButton>
                                                </div>
                                            </td>
                                        </tr>
                                    </Fragment>
                                )
                            })
                        }
                    </tbody>
                </table>
                }
            </div>
        </Fragment>
    )
}

export default CategoryList