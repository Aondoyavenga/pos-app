import { data } from 'autoprefixer'
import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { selectError, selectIsLoading, selectSuccess, setError, setSuccess } from '../app/slices/uiSlice'
import { addStaff } from '../appHooks/staffHook'
import DrawerMenu from './DrawerMenu'
import TransitionAlerts from './global/AppAlert'
import StaffList from './StaffList'


const StaffFeed = () => {
    const dispatch = useDispatch()
    const Error = useSelector(selectError)
    const success = useSelector(selectSuccess)
    const [open, setOpen] = useState(false)
    const isLoading = useSelector(selectIsLoading)
    const [body, setBody] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        confirmPassword: '',
        phoneNumber: '',
        role: {
            staff: null,
            trainee: null,
            manager: null
        }
    })
    const handleChange =e =>{
        const {value, name} = e.target
        setBody({
            ...body,
            [name]: value
        })
    }
    const handleCreate = e => {
        e.preventDefault() 
        dispatch(setError(null))
        dispatch(setSuccess(null))

        setOpen(false)
        const { lastName, firstName, email, password, phoneNumber, confirmPassword } = body
        if(!firstName) return( setOpen(true),
            dispatch(setError('First name is required')))
        if(!lastName) return( setOpen(true),
            dispatch(setError('Last name is required')))
        if(!phoneNumber) return( setOpen(true),
            dispatch(setError('Phone number is required')))
        if(!email) return( setOpen(true),
            dispatch(setError('Email is required')))
        if(!password) return( setOpen(true),
            dispatch(setError('Password is required')))
        if(password != confirmPassword) return( setOpen(true),
            dispatch(setError('Password must match')))
        dispatch(setError(null))
        setOpen(false)
        addStaff(body, dispatch, setBody, setOpen)
    }
    return (
        <Fragment>
            <main className='grid grid-cols-1 md:grid-cols-2
            md: max-w-3xl xl:grid-cols-7 xl:max-w-[95%] mx-auto shadow-md px-0 h-[85%]'>
            <div className='hidden xl:inline-grid col-span-1 overflow-auto scrollbar-none px-0 h-full bg-white'
            >
                <DrawerMenu />
               
            </div>
           
            <section className="col-span-6 overflow-y-auto pb-20 h-[100%] overflow-auto scrollbar-none">
                <div className='xl:inline-grid md:col-span-6 flex items-center justify-center w-full
                    py-2
                '
                >
                   <h1
                        className='text-pos_color font-bold text-2xl'
                   >POINT OF SALE STAFF</h1>
                </div>
                <main className='grid grid-cols-8 md:grid-cols-8 h-full'>
                    
                     <div className='hidden xl:inline-grid md:col-span-6
                        top-2 sticky overflow-auto scrollbar-none flex-1'>
                        <section>
                            <div
                                className='py-2 px-3'
                            >
                               <StaffList />
                            </div>
                        </section>
                    </div>
                    <div className='hidden xl:inline-grid md:col-span-2
                        top-2 sticky overflow-auto scrollbar-none'>
                        <div className='flex-1 w-full  
                            scrollbar-none h-full flex items-center justify-center px-2'
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
                                        success 
                                        message={success} 
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
                           
                               <span>First Name</span>
                               <input 
                                    type="text" 
                                    name="firstName"
                                    value={body.firstName}
                                    placeholder='First Name'
                                    onChange={e =>handleChange(e)}
                                    className='w-full focus:ring-0 hover:ring-0 rounded my-2'
                                />
                                <span>Last Name</span>
                                 <input 
                                    type="text" 
                                    name="lastName"
                                    value={body.lastName}
                                    placeholder='last Name'
                                    onChange={e =>handleChange(e)}
                                    className='w-full focus:ring-0 hover:ring-0 rounded my-2'
                                />
                                <span>Email Address</span>
                                 <input 
                                    type="text" 
                                    name="email"
                                    value={body.email}
                                    placeholder='Email Address'
                                    onChange={e =>handleChange(e)}
                                    className='w-full focus:ring-0 hover:ring-0 rounded my-2'
                                />
                                <span>Phone Number</span>
                                 <input 
                                    type="text" 
                                    name="phoneNumber"
                                    value={body.phoneNumber}
                                    placeholder='Phone Number'
                                    onChange={e =>handleChange(e)}
                                    className='w-full focus:ring-0 hover:ring-0 rounded my-2'
                                />
                                <div className="flex gap-2 items-center justify-center">
                                    <div>
                                        <span>Password</span>
                                        <input 
                                            type="password" 
                                            name="password"
                                            value={body.password}
                                            placeholder='Password'
                                            onChange={e =>handleChange(e)}
                                            className='w-full focus:ring-0 hover:ring-0 rounded my-2'
                                        />
                                    </div>
                                    <div>
                                        <span>Password</span>
                                        <input 
                                            type="password" 
                                            name="confirmPassword"
                                            value={body.confirmPassword}
                                            placeholder='Confirm password'
                                            onChange={e =>handleChange(e)}
                                            className='w-full focus:ring-0 hover:ring-0 rounded my-2'
                                        />
                                    </div>
                                </div>
                                <h3
                                    className='py-2 font-semibold text-lg text-pos_color'
                                >Right</h3>
                                <div className="flex gap-2 items-center justify-center">
                                    {/* <div className='w-full'>
                                        <span>Trainee</span>
                                        <select 
                                            name="trainee"
                                            value={body.role.trainee}
                                            onChange={e =>setBody({
                                                ...body,
                                                role: {
                                                    ...body.role,
                                                    trainee: e.target.value
                                                }
                                            })}
                                            className='w-full focus:ring-0 hover:ring-0 rounded my-2'
                                        >
                                            <option value=""></option>
                                            <option value={false}>No</option>
                                            <option value={true}>Yes</option>
                                        </select>
                                    </div> */}
                                    <div className='w-full'>
                                        <span>Staff</span>
                                        <select 
                                            name="staff"
                                            value={body.role.staff}
                                            onChange={e =>setBody({
                                                ...body,
                                                role: {
                                                    ...body.role,
                                                    staff: e.target.value
                                                }
                                            })}
                                            className='w-full focus:ring-0 hover:ring-0 rounded my-2'
                                        >
                                            <option value=""></option>
                                            <option value={false}>No</option>
                                            <option value={true}>Yes</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex gap-2 items-center justify-center">
                                    <div className='w-full'>
                                        <span>Manager</span>
                                        <select 
                                            name="manager"
                                            value={body.role.manager}
                                            onChange={e =>setBody({
                                                ...body,
                                                role: {
                                                    ...body.role,
                                                    manager: e.target.value
                                                }
                                            })}
                                            className='w-full focus:ring-0 hover:ring-0 rounded my-2'
                                        >
                                            <option value=""></option>
                                            <option value={false}>No</option>
                                            <option value={true}>Yes</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <button
                                        onClick={handleCreate}
                                        disabled={isLoading}
                                        className='py-2 my-4 w-[200px] text-white text-sm rounded-md 
                                        shadow-md bg-pos_color hover:bg-pos_color-green transition-all duration-150'
                                    > {isLoading ? 'Creating...': 'Create'} </button>
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

export default StaffFeed
