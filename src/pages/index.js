import { LockClosedIcon, SupportIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../app/slices/userSlice'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { DOMAIN } from '../constant'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getSession } from '../appHooks/staffHook'

const Home = ({user}) => {
    const dispatch = useDispatch()
    const router = useNavigate()
    const [Error, setError] = useState()
    const [data, setData] = useState({
        userName: '',
        password: ''
    })

    const hanldeLogIn = (e) =>{
        setError(null)
        e.preventDefault()
            axios.post('/user/login', data)
            .then(result =>{
                console.log(result.data)
                AsyncStorage.setItem('token', result.data?.token)
                dispatch(setUser(result.data))
                router('/dashboard')
            })
            .catch(error =>{
               if(error) return  setError(error.response.data.message)
            //    console.warn(error.response)
            })
       
    }
    useEffect(() =>{
       
            let deferredPrompt;
            const addBtn = document.querySelector('.add-button');
            addBtn.style.display = 'none';
            

            window.addEventListener('beforeinstallprompt', (e) => {
                // Prevent Chrome 67 and earlier from automatically showing the prompt
                e.preventDefault();
                // Stash the event so it can be triggered later.
                deferredPrompt = e;
                // Update UI to notify the user they can add to home screen
                addBtn.style.display = 'block';
              
                addBtn.addEventListener('click', (e) => {
                  // hide our user interface that shows our A2HS button
                  addBtn.style.display = 'none';
                  // Show the prompt
                  deferredPrompt.prompt();
                  // Wait for the user to respond to the prompt
                  deferredPrompt.userChoice.then((choiceResult) => {
                      if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the A2HS prompt');
                      } else {
                        console.log('User dismissed the A2HS prompt');
                      }
                      deferredPrompt = null;
                    });
                });
              });
             
        
    }, [])

    async function getToken() {
        const token = await AsyncStorage.getItem('token')
        if(!token) return(
            dispatch(setUser(null)),
            router('/')
        )

        getSession(dispatch, token)
        router('/dashboard')
    }

    useEffect(() => {
        
        getToken()
    }, [])
    return (
    <>
        {/* <PageHead 
            title='POS | Software'
        /> */}
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <button className="add-button">Add to home screen</button>
            <div className="max-w-md w-full space-y-4 shadow rounded p-3">
                <div> 
                    <p className='flex items-center justify-center'>
                        <img 
                            src={`${DOMAIN}public/static/logo.png`}
                            
                            style={{
                                width: 240,
                                height: 240,
                                objectFit: 'contain'
                            }}
                        />
                    </p>
                
                    {/* <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2> */}
                    <h2 className=" -mt-12 text-center text-3xl font-extrabold text-gray-900">{user?.id}</h2>
                
                </div>
                <form className="mt-8 space-y-6"  onSubmit={(e) =>hanldeLogIn(e)} method="POST">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md ">
                        <div>
                            <label htmlFor="usrname" className="sr-only">
                            Email address
                            </label>
                            <input
                            id="usrname"
                            name="userName"
                            type="text"
                            required
                            onChange={e =>setData({
                                ...data,
                                userName: e.target.value
                            })}
                            className='bg-gray-50 block w-full px-2 
                            sm:text-sm rounded-md focus:ring-black focus:border-black'
                            placeholder="Username (PU@1039)"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                            Password
                            </label>
                            <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            onChange={e =>setData({
                                ...data,
                                password: e.target.value
                            })}
                            className='bg-gray-50 block w-full px-2 
                            sm:text-sm rounded-md focus:ring-black focus:border-black my-5'
                            placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-ssl_color focus:ring-ssl_color-green border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                            Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-ssl_color hover:text-ssl_color-green">
                            Forgot your password?
                            </a>
                        </div>
                    </div>
                    {
                        Error && (
                            <p className='text-sm text-red-600'>{Error}</p>
                        )
                        }
                    <div>
                    
                        <button
                            type="submit"
                            onClick={(e) =>hanldeLogIn(e)}
                            // onClick={() =>router.push('/dashboard')}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent
                            text-sm font-medium rounded-md text-white bg-pos_color shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <LockClosedIcon className="h-5 w-5 text-white group-hover:text-ssl_color-green" aria-hidden="true" />
                            </span>
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <style> {`
            .add-button {
                position: absolute;
                top: 1px;
                left: 1px;
              }
              
        `} </style>
       
    </>
  )
}

// pages/admin.tsx


export default Home