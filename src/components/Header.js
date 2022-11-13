/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  BookmarkAltIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorClickIcon,
  MenuIcon,
  PhoneIcon,
  PlayIcon,
  RefreshIcon,
  ShieldCheckIcon,
  SupportIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/react/outline'
import logo from '../images/logo.png'
import {useSelector, useDispatch} from 'react-redux'
import { selectUser, setToken, setUser } from '../app/slices/userSlice'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getSession } from '../appHooks/staffHook'

const solutions = [
  {
    name: 'Analytics',
    description: 'Get a better understanding of where your traffic is coming from.',
    href: '#',
    icon: ChartBarIcon,
  },
  {
    name: 'Engagement',
    description: 'Speak directly to your customers in a more meaningful way.',
    href: '#',
    icon: CursorClickIcon,
  },
  { name: 'Security', description: "Your customers' data will be safe and secure.", href: '#', icon: ShieldCheckIcon },
  {
    name: 'Integrations',
    description: "Connect with third-party tools that you're already using.",
    href: '#',
    icon: ViewGridIcon,
  },
  {
    name: 'Automations',
    description: 'Build strategic funnels that will drive your customers to convert',
    href: '#',
    icon: RefreshIcon,
  },
]
const callsToAction = [
  { name: 'Watch Demo', href: '#', icon: PlayIcon },
  { name: 'Contact Sales', href: '#', icon: PhoneIcon },
]
const resources = [
  {
    name: 'Help Center',
    description: 'Get all of your questions answered in our forums or contact support.',
    href: '#',
    icon: SupportIcon,
  },
  {
    name: 'Guides',
    description: 'Learn how to maximize our platform to get the most out of it.',
    href: '#',
    icon: BookmarkAltIcon,
  },
  {
    name: 'Events',
    description: 'See what meet-ups and other events we might be planning near you.',
    href: '#',
    icon: CalendarIcon,
  },
  { name: 'Security', description: 'Understand how we take your privacy seriously.', href: '#', icon: ShieldCheckIcon },
]
const recentPosts = [
  { id: 1, name: 'Boost your conversion rate', href: '#' },
  { id: 2, name: 'How to use search engine optimization to drive traffic to your site', href: '#' },
  { id: 3, name: 'Improve your customer experience', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const Header = () =>{
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const navigate = useNavigate()

    const handleLogOut = async() => {
        await AsyncStorage.removeItem('token')
            
        dispatch(setUser(null))
        navigate('/')
            
    }

    async function getToken() {
        const token = await AsyncStorage.getItem('token')
        if(!token) return(
            dispatch(setUser(null)),
            dispatch(setToken(null)),
            navigate('/')
        )
          dispatch(setToken(token))
        getSession(dispatch, token)
    }

    useEffect(() => {
        
        getToken()
    }, [])
    return (
    <Popover className="relative bg-white">
      <div className="max-w-full">
        <div className="flex justify-between items-center border-b-2 border-gray-100 md:justify-start md:space-x-10">
          <div className="flex justify-start ml-12 lg:w-0 lg:flex-1">
            <p
                onClick={() =>navigate('/dashboard')}
            >
              {/* <span className="sr-only">Workflow</span> */}
              <img 
                src={logo}
               
               
                style={{
                  height:65,
                  width:65,
                  objectFit:'contain'
                }}
                alt="logo"
              />
            </p>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            

          </Popover.Group>
          <div className="hidden md:flex gap-2 items-center justify-end md:flex-1 lg:w-0 ">
             <p className='text-pos_color-green cursor-pointer'>  Hello! {`${user?.firstName} ${user?.lastName}`}</p>
            <p
                onClick={handleLogOut}
                
                className="whitespace-nowrap cursor-pointer mr-8 text-base font-medium text-gray-500 hover:text-gray-900">
            {!user? 'Sign in': 'Sign Out'}
            </p>
            {/* <a
              href="#"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Sign up
            </a> */}
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                <img 
                src='http://127.0.0.1:1000/public/static/logo.png'
               
               
                style={{
                  height:40,
                  width:40,
                  objectFit:'contain'
                }}
                alt="logo"
              />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6 hidden">
                <nav className="grid gap-y-8">
                  {solutions.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                    >
                      <item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                      <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6 hidden">
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                    <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                    Pricing
                    </a>

                    <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                    Docs
                    </a>
                    {resources.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className="text-base font-medium text-gray-900 hover:text-gray-700"
                    >
                        {item.name}
                    </a>
                    ))}
                </div>
                
                <div>
                    {/* <a
                    href="#"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                    Sign up
                    </a> */}
                    <p className="mt-6 text-center text-base font-medium text-gray-500">
                    Existing customer?{' '}
                    <a href="#" className="text-indigo-600 hover:text-indigo-500">
                        {!user? 'Sign in': 'Sign Out'}
                    </a>
                    </p>
                </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

export default Header;