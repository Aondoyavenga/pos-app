import { CakeIcon } from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectCategorys, selectSubCategorys, setSubCategorys } from '../app/slices/categorySlice'


const Products = ({search}) => {
    const dispatch = useDispatch()
    const categorys = useSelector(selectCategorys)
    const subcategories = useSelector(selectSubCategorys)
    const [active, setActive] = useState()

   
    return (
        <>
        <div className='w-full px-3 flex-1 sticky overflow-auto scrollbar-none'>
            <aside
               className='flex flex-row py-2 
               '
            >
                {
                    categorys?.length > 0 &&
                    categorys?.map((item, index) =>(
                        <div className={`bg-gray-50 mx-1 flex flex-col  items-center justify-center
                            font-medium px-1 py-2 w-[150px] h-[70px] rounded-md shadow-md flex-shrink-0
                            hover:shadow-lg hover:text-pos_color-green transition-all  duration-150
                            ${active == item._id ? 'text-pos_color-green': 'text-pos_color '} `} key={index*914}
                            onClick={() =>(
                                setActive(item._id),
                                dispatch(setSubCategorys(item?.subCategory)) 
                            )}
                        >
                            <p className='cursor-pointer'>
                                <CakeIcon className='h-5 w-5' />
                            </p>
                           <p className='cursor-pointer text-xs line-clamp-1'> {item?.name}</p>
                        </div>
                    ))
                }
            </aside>
            
        </div>
        <section  className='flex flex-row flex-wrap w-full mt-2'>
            {
                subcategories?.map((sub, index) =>(
                    <div className='bg-pos_color mx-1 flex items-center justify-center
                            text-white text-xs font-normal px-3 py-3 rounded-md shadow-md flex-shrink-0
                            hover:shadow-lg hover:text-pos_color-green hover: space-x-2 my-2 transition-all  duration-150
                        ' key={index*654}
                       
                    >
                        
                        <p className='cursor-pointer self-center flex'> {sub?.name}</p>
                    </div>
                ))
            }
        </section>
        </>
    )
}

export default Products
