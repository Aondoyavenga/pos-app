import React, { Fragment } from 'react'
import DrawerMenu from './DrawerMenu'
import OrderList from './OrderList'
import PostingAnalysis from './PostingAnalysis'
import PostTicket from './PostTicket'

const Feed = () => {
    return (
        <Fragment>
            <main className='grid grid-cols-1 md:grid-cols-2
            md: max-w-3xl xl:grid-cols-7 xl:max-w-full mx-auto  px-0 h-[89%] overflow-hidden scrollbar-none'>
            <div className='hidden xl:inline-grid col-span-1 overflow-auto scrollbar-none px-0 h-full bg-white                '
            >
                <DrawerMenu />
                <PostingAnalysis />
            </div>
           
            <section className="col-span-6 overflow-y-auto pb-20 h-[100%] overflow-auto scrollbar-none">
                <div className='xl:inline-grid md:col-span-6 flex items-center justify-center w-full
                    py-2
                '
                >
                   <h1
                        className='text-pos_color font-bold text-2xl'
                   >POINT OF SALE (WITH INVENTORY)</h1>
                </div>
                <main className='grid grid-cols-8 md:grid-cols-8 h-full'>
                    
                     <div className='hidden xl:inline-grid md:col-span-8
                        top-2 sticky overflow-auto scrollbar-none flex-1'>
                        <section>
                            <div className='flex-1 top-4'>
                            <PostTicket />
                            </div>
                            <div
                                className='py-2 px-3'
                            >
                                <OrderList title='Sales List' />
                            </div>
                        </section>
                    </div>
                    {/* <div className='hidden xl:inline-grid md:col-span-2
                        top-2 sticky overflow-hidden scrollbar-none'>
                        <div className='flex-1 top-4 w-full sticky overflow-hidden scrollbar-none'>
                           <Products />
                        </div>
                    </div> */}
                </main>
                
            </section>

           
        </main>
        </Fragment>
    )
}

export default Feed
