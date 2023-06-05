import React, { Fragment } from 'react'
import DrawerList from './DrawerList'
import {
    UsersIcon,
    UserGroupIcon,
    ShoppingBagIcon,
    ClockIcon
} from '@heroicons/react/outline'
import {useNavigate} from 'react-router-dom'
import { DatabaseIcon, HomeIcon, ShoppingCartIcon } from '@heroicons/react/solid'
import { useSelector } from 'react-redux'
import { selectUser } from '../app/slices/userSlice'

const DrawerMenu = () => {
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    return (
        <section>
            {
                user?.role?.manager == true ?
            <DrawerList 
                title='Home'
                func={ () =>navigate('/home')}
                icon={<HomeIcon className='h-6 text-pos_color' />}
            />
            : null
            }
            <DrawerList 
                title='Sales'
                func={ () =>navigate('/dashboard')}
                icon={<ShoppingCartIcon className='h-6 text-pos_color' />}
            />
            {
                user?.role?.staff == true || user?.role?.manager == true ?
            
                <Fragment>
                    <DrawerList 
                        title='Staffs'
                        func={ () =>navigate('/staff')}
                        icon={<UsersIcon className='h-6 text-pos_color' />}
                    />
                    <DrawerList 
                        title='Report'
                        func={ () =>navigate('/reports')}
                        icon={<ClockIcon className='h-6 text-pos_color'  />}
                    /> 
                    <DrawerList 
                        title='Order List'
                        func={ () =>navigate('/orderlist')}
                        icon={<ClockIcon className='h-6 text-pos_color'  />}
                    />

                    <DrawerList 
                        title='Sold'
                        func={ () =>navigate('/sales_report')}
                        icon={<ClockIcon className='h-6 text-pos_color'  />}
                    />

                    {
                        user?.role?.manager == true ?
                    <Fragment>
                        <DrawerList 
                            title='Products'
                            func={ () =>navigate('/products')}
                            icon={<ShoppingBagIcon className='h-6 text-pos_color'  />}
                        />
                        <DrawerList 
                            title='Categories'
                            func={ () =>navigate('/categories')}
                            icon={<ShoppingBagIcon className='h-6 text-pos_color'  />}
                        />
                        <DrawerList 
                            title='Counter'
                            func={ () =>navigate('/counter')}
                            icon={<DatabaseIcon className='h-6 text-pos_color'  />}
                        />
                    </Fragment>
                    :null
                    }
                </Fragment>
                :null
            }
            <DrawerList 
                title='Customers & Vendors'
                func={ () =>navigate('/customer')}
                icon={<UserGroupIcon className='h-6 text-pos_color'  />}
            />
        </section>
    )
}

export default DrawerMenu
