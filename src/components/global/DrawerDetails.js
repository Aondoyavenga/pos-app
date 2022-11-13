import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Currency from 'react-currency-formatter'
import { selectDrawer } from '../../app/slices/orderSlice'
import { handleCloseSales } from '../../appHooks/orderHook'

const ListItem = ({title, value, className}) => {
    return (
        <div className='flex justify-between py-1'>
            <div>
                <p className='cursor-pointer text-gray-500'>{title}</p>
            </div>
            <div>
                <h3 className={`${className} cursor-pointer font-semibold`}>
                    <Currency 
                        currency='NGN'
                        quantity={value ? value : 0}
                    />
                </h3>
            </div>
        </div>
    )
}

const DrawerDetails = ({counter}) =>{
    const dispatch = useDispatch()
    const [closeID, setCloseId] = useState()
    const drawer = useSelector(selectDrawer)

    useEffect(() => {
        const date = new Date()

        const d = date.getDay()
        const dat = date.getDate()
        const m = date.getMonth()+1
        const y = date.getFullYear()
        const id = `${d}${dat}${m}${y}`

        setCloseId(id)
    }, [])

  return (
    <div className={`flex justify-center w-[80%] mx-auto ${!counter ?'shadow-md' : ''} my-5 p-4 rounded-md`}>
        <div
            className='flex w-full flex-col justify-center'
        > 
            <div className='flex justify-between w-full'>
                <p className='text-md font-medium'> #{ counter ? drawer?.closeID : closeID} </p>
                {
                    counter &&
                    <p className='text-red-500'> Closed </p>
                }
            </div>
           <ListItem 
                value={drawer?.paidAmount}
                title='Total Paid'
                className={'text-pos_color-green'}
           />
           <ListItem 
                value={drawer?.dryCashAmount}
                title='Total Out Standing'
                className={'text-red-500'}

           />
           <ListItem 
                value={drawer?.cashTotal}
                title='Total Cash Amount'
                className={'text-pos_color-green'}
           />
            <ListItem 
                value={drawer?.posTotal}
                title='Total POS Amount'
                className={'text-pos_color'}
           />
            <ListItem 
                value={drawer?.transferTotal}
                title='Total Transfer Amount'
                className={'text-yellow-500'}

           />
            <ListItem 
                value={drawer?.changeAmount}
                title='Total Change Amount'
                className={'text-orange-500'}

           />
           <ListItem 
                value={drawer?.totalAmount}
                title='Total Amount'
           />
            {
                drawer.accountBalance  ? 
                <p className='text-pos_color-green text-center cursor-pointer'>Congratulation, Your account is balanced </p>
                
                :
                <p className='text-red-500 text-center py-2 cursor-pointer'>Note !!! : Your account is not balance with outstanding balance of {' '}
                    <Currency 
                        currency='NGN'
                        quantity={drawer.dryCashAmount}
                    />
                    .<br /> { counter ? '' :'Are you sure you still want to close ?'}
                </p>
            }
            <div
                className='flex justify-center w-full'
            >
                {
                    !counter &&
                    <button 
                        variant='contained'
                        onClick={() =>handleCloseSales(dispatch, {closeID, ...drawer})}
                        className='w-[25%] py-3 rounded-md  bg-pos_color text-white px-10 shadow-md hover:shadow-lg'
                    >
                        <p>Close</p>
                    </button>
                }
            </div>
        </div>
    </div>
  )
}

export default DrawerDetails
