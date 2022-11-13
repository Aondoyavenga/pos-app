/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch } from 'react-redux'
import { setCalloverOrder, setOrderItems, setVoucher } from '../../app/slices/orderSlice'

const AppPopOver = ({func, open, title, isPrint, children, setOpen}) => {
    const dispatch = useDispatch()
    const cancelButtonRef = useRef(null)

    const handleClear = () => {
        dispatch(setVoucher([]))
        dispatch(setOrderItems([]))
        dispatch(setCalloverOrder([]))
    }
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        {/* <Dialog.Overlay className="fixed inset-0 transition-opacity" /> */}
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="relative inline-block align-bottom bg-white rounded-lg text-left 
                            overflow-hidden shadow transform transition-all sm:my-8 sm:align-middle lg:max-w-[60%] sm:max-w-[80%] sm:w-full">
                            {/* <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            {title}
                                        </Dialog.Title>
                                        <div className="mt-2">
                                           {children}
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <section
                                className='w-full'
                            >
                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-white bg-pos_color
                                    px-2 py-2 shadow cursor-pointer
                                ">
                                    {title}
                                </Dialog.Title>

                                <div className="mt-2 px-2 py-3">
                                    {children}
                                </div>
                            </section>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                {
                                    func &&
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2
                                        bg-pos_color text-base font-medium text-white hover:bg-pos_color-green focus:outline-none focus:ring-0 
                                        focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => func()}
                                    >
                                    {title}
                                    </button>
                                }
                                {
                                    isPrint?
                                    // <a href='/dashboard'>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2
                                            bg-white text-base font-medium text-pos_color hover:bg-gray-50 focus:outline-none focus:ring-0 focus:ring-offset-2 
                                            sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => (setOpen(false), handleClear(), dispatch(setVoucher([])), dispatch(setCalloverOrder([])))}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    // </a>
                                    :
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2
                                        bg-white text-base font-medium text-pos_color hover:bg-gray-50 focus:outline-none focus:ring-0 focus:ring-offset-2 
                                        sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => (setOpen(false), handleClear())}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                }
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default AppPopOver
