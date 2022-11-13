import { LoginIcon, SearchIcon } from '@heroicons/react/outline'
import { ArrowRightIcon, CashIcon, ChevronDownIcon, LockClosedIcon, SaveIcon, TrashIcon, UserIcon, } from '@heroicons/react/solid'
import { v4 } from 'uuid'
import React, { useState, useEffect, Fragment, } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomers, selectSelectedCustomer, setSelectedCustomer } from '../app/slices/customerSlice'
import CustomerPopover from './CustomerPopover'
import axios from 'axios'
import { selectProducts, selectSelectedProduct, setSelectedProduct } from '../app/slices/productSlice'
import { selectUser } from '../app/slices/userSlice'
import Currency from 'react-currency-formatter'
import { selectError, selectIsDrawer, selectIsLoading, selectIsPrint, selectSuccess, setError, setIsDrawer, setIsLoading, setisPrint, setSuccess } from '../app/slices/uiSlice'
import TransitionAlerts from './global/AppAlert'
import AppPopOver from './global/AppPopOver'
import { getAllOrders, handleCloseSales } from '../appHooks/orderHook'
import CustomerTableView from './CustomerTableView'
import PayForm from './PayForm'
import { selectCalloverOrder, selectOrders, setCalloverOrder, setTotalSummary } from '../app/slices/orderSlice'
import { getAllCustomers } from '../appHooks/customerHook'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import SalesReceipt from './SalesReceipt'
import DrawerDetails from './global/DrawerDetails'


const PostTicket = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const [search, setSearch] = useState('')
    const [open, setOpen] = useState(false)
    const [pay, setPay] = useState(false)
    const isPrint = useSelector(selectIsPrint)
    const isDrawer = useSelector(selectIsDrawer)

    const [saleId, setSaleId] = useState('')
    const [customer, setCustomer] = useState('')
    const products = useSelector(selectProducts)
    const isLoading = useSelector(selectIsLoading)
    const Error = useSelector(selectError)
    const success = useSelector(selectSuccess)
    const callover = useSelector(selectCalloverOrder)
    const product = useSelector(selectSelectedProduct)
    const customers = useSelector(selectCustomers)
    const sales = useSelector(selectOrders)

    const selectedCustomer = useSelector(selectSelectedCustomer)

    const [data, setData] = useState({
        userRef: '',
        orderId: "",
        tx_date: "",
        VALUES: [],
        amount: "",
        orderOn: "",
        sale_date: "",
        customerRef: '',
        orderType: 'SALE',
        totalPaid: '',
        payMethod: ''

    })

    const paymentTemplate = {
        amount: '',
        payMethod: ''
    }

    const [paymentform, setPaymentForm] = useState([paymentTemplate])
    const addPaymentForm = () => {
        setPaymentForm([...paymentform, paymentTemplate]);
    };
    const handleRemovePaymentform = (index) => {
        const filterpaymentform = [...paymentform];
        filterpaymentform.splice(index, 1);
    
        setPaymentForm(filterpaymentform);
    };

    const handlesetPaymentFormData = (name, value, index) => {
        const updatePayForm = paymentform.map((payform, i) =>
            index == i ? Object.assign(payform, {[name]: value}): payform
        )

        setPaymentForm(updatePayForm)
    }

    const saleFormTemplate = {
        orderId: '',
        orderType: '',
        SKU_UPC: '',
        product: '',
        productRef: '',
        quantity: '',
        amount: '',
        discount: '',
        total: ''
    };

    const [saleForm, setSaleForm] = useState([]);

    const calcuAmt = (data) => {
        const total = data && data.reduce((a, v) => +v.total + a, 0);
        const tax = (parseFloat(total)* 8.25) / 100
        const sumTotal = parseInt(total)
        return {tax,total, sumTotal};
    };

    const calcuPayment = (form) =>{
        const total = form?.reduce((a,b) =>a + parseInt(b.amount), 0)
        return parseInt(total)
    }
    const renderAmount = (pro, qty) => {
        const proExist = products && products.find((prop) => prop._id == pro);
       
        const total = proExist && data.orderType == 'PURCHASE' ? parseInt(proExist.purchasePrice) * parseInt(qty) : parseInt(proExist.salesPrice) * parseInt(qty);

        return total;
       
    };
    const addSaleFrom = () => {
        setSaleForm([...saleForm, saleFormTemplate]);
    };

    const handleRemovesaleform = (index) => {
        const filtersaleform = [...saleForm];
        filtersaleform.splice(index, 1);
    
        setSaleForm(filtersaleform);
    };

    const handleChange = (name, value, index) => {
        
        const updatedsaleform = saleForm.map((salef, i) =>
          index == i ? Object.assign(salef, { [name]: value }) : salef
        );
        setSaleForm(updatedsaleform);
        
        if (name == "quantity" || name == "product") {

            const updatedsaleform = saleForm.map((salef, i) =>
            index == i
              ? Object.assign(salef, {
                  
                  total: renderAmount(
                    saleForm[index].productRef,
                    // index,
                    saleForm[index].quantity
                  ),
                })
              : salef
          );
          
          return setData({
            ...data,
            amount: calcuAmt(saleForm).total
          });
        }
    };

    const handleClear = () => {
        setTimeout(() => {
            dispatch(setSuccess(null))
        }, 5000);
        setCustomer('')
            setSearch('')
            dispatch(setSelectedProduct(null))
            dispatch(setSelectedCustomer(null))
            setData({
                status: 'Open',
                userRef: '',
                orderId: "",
                tx_date: "",
                VALUES: [],
                amount: "",
                orderOn: "",
                total: '',
                sale_date: "",
                customerRef: '',
                orderType: 'SALE',
            })
            setSaleForm([])
            setPaymentForm([paymentTemplate])
            
            setPay(false)
            dispatch(setCalloverOrder(null))
            const id = ( Math.random(new Date().getTime()))

        return setData({
            ...data,
            orderOn: new Date(),
            orderId: `${id?.toString()?.split('.')[1]?.substring(0,8)}`
        }) 

       
    }


    const isErrors = []
    const handleValidation = (val) => {
        let isError
        val?.map((item, index) => {
            if(item.quantity > item.Qty)  return isErrors.push(true)
          isErrors.push(false)
        })
       
    }
    const handlePost = async(save) => {
        setTimeout(() =>{
            dispatch(setError(null))
            return dispatch(setSuccess(null))
        }, 7000)
        dispatch(setError(null))

        const body = {
            ...data,
            payment: save ? [] : data.orderType =='PURCHASE' ? paymentform : !callover?.order?.payment ? paymentform : [...paymentform, ...callover?.order?.payment],
            status: data.totalPaid >= data.amount ? 'Paid' : 'Open',
            VALUES: saleForm
        }
        handleValidation(body.VALUES)
        // if(isErrors.includes(true) && data.orderType =='SALE') return (dispatch(setError(`Quantity is too low`)), alert(`Quantity is too low`))


        try {
            if(!data.totalPaid && !save) return( setOpen(true), dispatch(setError('Please enter a payment amount')))
            const { data:result, status } = await axios.post('/orders', body)
            if(status == 201) return(
                dispatch(setSuccess(result.message)),
                dispatch(setIsLoading(false)),
                setOpen(true),
                setPay(false),
                getAllOrders(dispatch)
            )
            dispatch(setError(result?.message))
            dispatch(setIsLoading(false))

        } catch (error) {
            dispatch(setIsLoading(false))
            setOpen(true)
            if(error) return dispatch(setError(error.response?.data?.message))
        }
    }

    useEffect(() => {
        const fdata = saleForm.map((x) => Object.values(x));
        const findal = [];
        // const data = fdata
        for (let i = 0; i < fdata.length; i++) {
          const element = fdata[i];
          findal.push(element);
        }
    
        setData({
          ...data,
          VALUES: findal,
        });
    }, [saleForm]);

    useEffect( () => {
        getAllCustomers(dispatch)
        
    }, [])

    useEffect(() => {
       if(product) {
        const { _id, SKU_UPC, discount, quantity, purchasePrice, salesPrice, productName } = product
        return setSaleForm([
            ...saleForm,
            {
                orderRow: v4(),
                orderId: data.orderId,
                orderType: data.orderType,
                SKU_UPC,
                product: productName,
                productRef: _id,
                quantity: 1,
                amount: data.orderType == 'PURCHASE' ? purchasePrice : salesPrice,
                discount,
                total: data.orderType == 'PURCHASE' ? purchasePrice : salesPrice,
                Qty: quantity

            }
        ])
       }
    }, [product])

    useEffect(() => {
        if(!selectedCustomer) return
        return setData({
            ...data,
            userRef: user?._id,
            customerRef: selectedCustomer?._id
        })
    },[selectedCustomer])

    useEffect(() => {
        setData({
            ...data,
            amount: calcuAmt(saleForm).sumTotal
        })
     
        
        const summary = calcuAmt(saleForm)
        dispatch(setTotalSummary(summary))
    }, [saleForm])

    const barCodeScanner = () =>{
        var barcode = '';
        var interval;
        document.addEventListener('keydown', function(evt) {
            if (interval)
                clearInterval(interval);
            if (evt.code == 'Enter') {
                if (barcode)
                    handleBarcode(barcode);
                barcode = '';
                return;
            }
            if (evt.key != 'Shift')
            
                barcode += evt.key;
            interval = setInterval(() => barcode = '', 20);
        });

        function handleBarcode(scanned_barcode) {
            setSearch(scanned_barcode) ;
        }
        
    }

   
    useEffect(() =>{
        if(!callover?.order) return
        setData({
            ...data,
            totalPaid: ''
        })
        const { order, orderItems } = callover
        setData({
            userRef: order?.userRef?._id,
            orderId: order?.orderId,
            // tx_date: "",
            amount: order?.amount,
            orderOn: order?.orderOn,
            sale_date: order?.createdAt,
            customerRef: order?.customerRef?._id,
            orderType: order?.orderType,
            totalPaid: order?.totalPaid,
            payMethod: order?.payMethod
        })
        const customer = customers?.find(cus =>cus._id == order?.customerRef?._id)
        setCustomer(`${customer?.firstName} ${customer?.lastName}`)

        const itemForm = orderItems?.map(item =>{
            return ({
                orderRow: item.orderRow,
                orderId: item.orderId,
                orderType: item.orderType,
                SKU_UPC: item.SKU_UPC,
                product: item.productRef?.productName,
                productRef:item?.productRef?._id,
                quantity: item.quantity,
                amount: item.amount,
                discount: item.discount,
                total: item.total,
                Qty: item.Qty

            })
        })
        setPay(true)
        return setSaleForm(itemForm)
    }, [callover])
   
    useEffect(() =>{
        setData({
            ...data,
            totalPaid: callover?.order?.totalPaid? parseInt(callover?.order?.totalPaid) + calcuPayment(paymentform) :  calcuPayment(paymentform)
        })
    }, [paymentform])

    useEffect(() => {
        handleClear()
    }, [success])
    const id = ( Math.random(new Date().getTime()))

    useEffect(() =>{
       
        barCodeScanner()
        setData({
            ...data,
            orderOn: new Date(),
            orderId: data?.orderId !=='' ? data?.orderId : `${id?.toString()?.split('.')[1]?.substring(0,8)}`
        }) 
    }, [])

    
    return (
        <div
            className='w-full h-full sticky overflow-auto scrollbar-none px-3'
        >
            {
                <AppPopOver 
                    open={pay}
                    setOpen={setPay}
                    func={handlePost}
                    title='Pay'
                >
                        <CustomerTableView 
                            saleForm={saleForm}
                            orderType={data.orderType}
                            handleChange={handleChange}
                            handleRemovesaleform={handleRemovesaleform}
                        />

                    <PayForm 
                        data={data}
                        setData={setData}
                        paymentform={paymentform}
                        addPaymentForm={addPaymentForm}
                        handleRemovePaymentform={handleRemovePaymentform}
                        handlesetPaymentFormData={handlesetPaymentFormData}

                    />
                </AppPopOver>
            }
            {
                <AppPopOver 
                    open={isPrint}
                    isPrint
                    setOpen={() =>dispatch(setisPrint(false))}
                    title='Sales Receipt'
                >
                    <SalesReceipt />
                    {/* <NewReceipt /> */}
                </AppPopOver>
            }

                <AppPopOver 
                    open={isDrawer}
                    setOpen={() =>dispatch(setIsDrawer(false))}
                    title='Sales Analysis'
                >
                    <DrawerDetails />
                    {/* <NewReceipt /> */}
                </AppPopOver>
           
            <div
                className='flex flex-row justify-center'
            >
                <div
                    className='flex flex-row flex-1'
                >
                    <p className='text- mr-1 text-md font-semibold cursor-pointer'>Sale</p>
                  
                    {
                        user?.role?.manager == true?
                        <Fragment>
                            <button
                                onClick={() =>setData({
                                    ...data,
                                    orderType: 'SALE' 
                                })}
                                className={`${data.orderType == 'SALE'? 'bg-pos_color-green': 'bg-white'}
                                    text-white px-1 rounded-r-none rounded-sm shadow-md
                                `}
                            >
                                <ChevronDownIcon className='h-6' />
                            </button>
                            <button
                                onClick={() =>setData({
                                    ...data,
                                    orderType: 'PURCHASE' 
                                })}
                                className={`${data.orderType == 'PURCHASE'? 'bg-pos_color-green': 'bg-white'}
                                    text-white px-1 rounded-l-none rounded-sm shadow-md
                                `}
                            >
                                <ChevronDownIcon className='h-6' />
                            </button>
                            <p className='text-pos_color ml-1 text-md font-semibold cursor-pointer'>Purchase</p>
                        </Fragment>
                        :
                       
                        <button
                            onClick={() =>setData({
                                ...data,
                                orderType: 'SALE' 
                            })}
                            className={`${data.orderType == 'SALE'? 'bg-pos_color-green': 'bg-white'}
                                text-white px-1 rounded-r-none rounded-sm shadow-md
                            `}
                        >
                            <ChevronDownIcon className='h-6' />
                        </button>
                    }
                </div>
                
                <div
                    className='flex items-center w-full justify-center'
                >
                    <h2
                        className='text-pos_color-green font-semibold text-lg'
                    > {data.type} </h2>
                </div>
                <div
                    className=' hover:text-pos_color-green'
                >
                    <LoginIcon
                        className='w-6' 
                    />
                </div>
              
            </div>
            
            <table
                className='w-full my-3 table'
            >
               
                <tbody className='w-full'>

                    <tr className='flex flex-row w-full'>
                        <td className='bg-white py-1 text-center  flex flex-row items-center justify-between
                            
                        '>
                            <input 
                                type="text" 
                                value={saleId}
                                placeholder='Enter id'
                                onChange={e =>setSaleId(e.target.value)}
                                className='border-none focus:ring-0
                                focus:outline-none focus:border-none flex-1 py-1 text-center' 
                            />
                            <SearchIcon
                                onClick={() => !saleId ?(setOpen(true), dispatch(setError('Sale id is required'))): (setOpen(false), navigate(`/sale/${saleId}`))} 
                                className='h-6 text-gray-200' 
                            />
                        </td>
                        <td className='bg-white py-1 text-center  flex flex-row items-center justify-between
                            border-1 border-pos_color border w-full
                        '>
                            <input 
                            type="text" 
                            placeholder='Enter Customer'
                            value={`${selectedCustomer?.firstName?selectedCustomer?.firstName: ''} ${selectedCustomer?.lastName ? selectedCustomer?.lastName: ''}`}
                            className=' focus:ring-0 border-none
                            focus:outline-none focus:border-none h-6' 
                            />
                            <UserIcon className='h-5 text-lg text-gray-200' />
                        </td>
                       
                        <td className=' py-1 text-center
                            border-1 border-pos_color border w-full
                        '
                            
                        >
                            <p className='text-sm text-gray-400'>
                                {user ? `${user?.firstName} ${user?.lastName}` : null}
                            </p>
                        
                        </td>
                        <td className=' py-1 text-center  flex flex-row items-center justify-end
                            border-1 border-pos_color border w-full
                        '>
                            <p className='text-sm text-pos_color self-end px-3'>status:</p>
                        
                        </td>
                        <td className=' py-1 text-center  flex flex-row items-center justify-end
                            border-1 border-pos_color border w-full
                        '>
                            <p className='text-sm text-gray-400 self-end px-3'>
                              Open
                            </p>
                        
                        </td>
                    </tr>

                    <tr className='flex flex-row w-full'>
                        <td className=' py-1 text-center  flex items-center justify-between
                           border-1 border-pos_color border
                        '>
                            <div
                                className='flex flex-row items-center w-full'
                            >
                                <p className='text-sm text-pos_color self-end w-full px-3'>
                                    Customer:
                                </p>
                                <ArrowRightIcon className='w-6 animate-pulse' />
                            </div>
                        </td>
                        <td className='py-1 text-center  flex flex-row items-center justify-between
                            border-1 border-pos_color border w-full
                        '>
                           
                            <div className='hover:text-pos_color-green w-full'>
                               <CustomerPopover 
                                    customer={customer} 
                                    setCustomer={setCustomer} 
                                />
                            </div>
                        </td>
                        <td className=' py-1 text-center flex flex-col items-center justify-center
                            border-1 border-pos_color border w-full
                        '>
                            <p className='text-sm text-pos_color self-end'>Order on:</p>
                        
                        </td>
                        <td className=' py-1 text-center  flex flex-row items-center 
                            border-1 border-pos_color border w-full justify-center
                        '>
                            <p className='text-sm text-gray-400 px-3 line-clamp-1'>
                                {new Date().toLocaleString()}
                            </p>
                            
                        </td>
                        <td className=' py-1 text-center flex flex-row items-center justify-center
                            border-1 border-pos_color border w-full 
                        '>
                            <p className='text-sm text-pos_color self-end'>Order Id:</p>
                        
                        </td>
                        <td className=' py-1 text-center 
                            border-1 border-pos_color border
                        '>
                            <p className='text-xs text-pos_color self-start px-2'>
                               {data.orderId}
                            </p>
                        
                        </td>
                        
                    </tr>
                    <tr className='flex flex-row w-full'>
                        <td className=' py-1 text-center  flex flex-row items-center justify-between
                           border-1 border-pos_color border  w-full
                        '>
                            <p className='text-sm text-pos_color self-end px-3'>
                                SKU/UPC
                            </p>
                            <div
                                className='flex flex-row items-center justify-center'
                            >
                                <p className='text-sm text-pos_color self-end px-3'>
                                    Add item to cart
                                </p>
                                <ArrowRightIcon className='w-6 animate-pulse' />
                            </div>
                            
                            
                        </td>
                        <td className='py-1 text-center  flex flex-row items-center justify-between
                            border-1 border-pos_color border w-full
                        '
                        rowSpan={1}
                        >
                           
                            <div className='hover:text-pos_color-green w-full'>
                               <CustomerPopover
                                    product
                                    search={search}
                                    setSearch={setSearch}
                               />
                            </div>
                        </td>
                        {/* <td className='py-1 text-center w-full
                            border-1 border-pos_color border row-span-3
                        '
                        rowSpan={1}
                        >
                        
                        </td> */}
                        
                    </tr>

                </tbody>

            </table>

           
            <div
                className='relative'
            >
                <CustomerTableView 
                    saleForm={saleForm}
                    handleChange={handleChange}
                    handleRemovesaleform={handleRemovesaleform}
                />
            </div>
            
            <section
                className='flex flex-row py-2 justify-between shadow px-2 mt-4'
            >
                <div className='w-full'>
                    <div>
                        <p className='font-semibold' >Thank You For Doing Business With Us</p>
                    </div>
                    
                    <Typography variant='caption' className='font-semibold text-red-700'>Parvic Supermarkets </Typography>
                    {/* <Typography variant='caption'>Abdule Plaza, Off Tasha Bwari Express Way,</Typography> */}
                    <Typography variant='caption'>Abdul Plaza, Plot BDS 01 DUT</Typography>

                    {/* <Typography variant='caption'>Off Sokale Roundabout Dutse, FCT Abuja.</Typography> */}
                    <Typography variant='caption'>+234 916 2220 163, </Typography>
                    <Typography variant='caption'>info@parvicsupermartkets.net </Typography>
                </div>
                <div className='w-full flex flex-col justify-center items-center'>
                    <div className='text-white'></div>
                    <Typography variant='caption'>Receipt #: {data.orderId}</Typography>
                    <Typography variant='caption'>Order On: {new Date().toLocaleString()} </Typography>
                    <div className='flex mx-5'>Cashier: {`${user?.firstName} ${user?.lastName}`} </div>
                    {/* <div>Signature: </div> */}
                </div>
                <div
                    className='flex w-full flex-col gap-1'
                >
                    <div
                        className='flex flex-row items-center justify-between gap-4'
                    >
                        <div
                            className='flex justify-end flex-1'
                        >
                            <p>Sub-Total:</p>
                        </div>
                        <div
                            className='font-semibold flex-1 justify-end flex'
                        >
                            <Currency
                                currency='NGN'
                                quantity={calcuAmt(saleForm).total? calcuAmt(saleForm).total: 0}
                            />
                        </div>
                    </div>
                    {/* <div
                        className='flex flex-row items-center justify-between gap-4'
                    >
                        <div
                            className='flex justify-end flex-1'
                        >
                            <p>Tax(7.5%):</p>
                        </div>
                        <div
                            className='font-semibold flex-1 justify-end flex'
                        >
                            <Currency
                                currency='NGN'
                                quantity={calcuAmt(saleForm).tax? calcuAmt(saleForm).tax: 0}
                            />
                        </div>
                    </div> */}
                    <div
                        className='flex flex-row items-center justify-between gap-4'
                    >
                        <div
                            className='flex justify-end flex-1'
                        >
                            <p>Total:</p>
                        </div>
                        <div
                            className='font-semibold flex-1 justify-end flex text-pos_color-green'
                        >
                            <Currency
                                currency='NGN'
                                quantity={calcuAmt(saleForm).sumTotal? calcuAmt(saleForm).sumTotal: 0}
                            />
                        </div>
                    </div>
                    <div
                        className='flex flex-row items-center justify-between gap-4'
                    >
                        <div
                            className='flex justify-end flex-1'
                        >
                            <p>Total Paid:</p>
                        </div>
                        <div
                            className='font-semibold flex-1 justify-end flex text-pos_color'
                        >
                            <Currency
                                currency='NGN'
                                quantity={data?.totalPaid? data?.totalPaid: 0}
                            />
                        </div>
                    </div>
                    <div
                        className='flex flex-row items-center justify-between gap-4'
                    >
                        <div
                            className='flex justify-end flex-1'
                        >
                            <p>Change:</p>
                        </div>
                        <div
                            className='font-semibold flex-1 justify-end flex text-red-500'
                        >
                            <Currency
                                currency='NGN'
                                quantity={data?.change? data?.change: 0}
                            />
                        </div>
                    </div>
                </div>
            </section>
            {/* buttons */}

            <div
                className='flex flex-row justify-between items-center w-full
                border-t-2 border-pos_color
                '
            >
                <button
                    onClick={handleClear} 
                    className='rounded-sm flex-1 mr-1 bg-white shadow-md text-pos_color
                        flex flex-row gap-2 py-2 px-2 hover:shadow-lg hover:text-red-600 focus:ring-0
                        justify-center
                    '
                >
                    <p> Clear</p>
                        <TrashIcon className='h-6 w-6' />
                </button>
                <button 
                    disabled={success}
                    onClick={() =>!data.amount ? (
                        setOpen(true),  
                            dispatch(setError('Please add item'))): (
                                setPay(true),
                                setData({...data, 
                                    totalPaid: data?.totalPaid ? data.totalPaid :0})
                            )}
                    // disabled={isLoading}
                    className='rounded-sm flex-1 mx-1 bg-white shadow-md text-pos_color
                        flex flex-row gap-2 py-2 px-2 hover:shadow-lg hover:text-pos_color-green
                        justify-center
                    '
                >
                    <CashIcon className='h-6 w-6' />
                    <p> {isLoading ? 'Paying...': 'Pay'} </p>
                </button>
                <button 
                    disabled={callover?.order ? true : false }
                    onClick={() =>handlePost('save')}
                    className='rounded-sm flex-1 ml-1 mr-0 bg-white shadow-md text-pos_color
                        flex flex-row gap-2 py-2 px-2 hover:shadow-lg hover:text-pos_color-green
                        justify-center
                    '
                >
                    <SaveIcon className='h-6 w-6' />
                    <p> Save</p>
                </button>
                <button 
                    disabled={!sales?.length > 0}
                    onClick={() =>handleCloseSales(dispatch)}
                    className='rounded-sm flex-1 ml-1 mr-0 bg-white shadow-md text-pos_color
                        flex flex-row gap-2 py-2 px-2 hover:shadow-lg hover:text-pos_color-green
                        justify-center
                    '
                >
                    <LockClosedIcon className='h-6 w-6 text-red-500' />
                    <p className='text-red-500'> Close</p>
                </button>
              
                
            </div>
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
        </div>
    )
    
}

export default PostTicket
