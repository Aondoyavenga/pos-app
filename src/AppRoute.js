import axios from 'axios';
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { Route, Routes } from "react-router-dom";
import { selectToken } from './app/slices/userSlice';
import Home from './pages';
import Categories from './pages/Categories';
import Counter from './pages/Counter.js';
import Customer from './pages/Customer';
import Dashboard from './pages/dashboard';
import HomePage from './pages/HomePage';
import Products from './pages/products';
import Reports from './pages/reports';
import Staff from './pages/Staff';
import ProductOrderList from './pages/order'
import SalesReport from './pages/sales_report';

const AppRoute = () => {
    const token = useSelector(selectToken)
    
    // axios.interceptors.request.use(function(config) {
    //     config.headers.Authorization = token;
    //     return config 
    // })
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return (
        <Fragment>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/sales_report" element={<SalesReport />} />

                <Route path="/orderlist" element={<ProductOrderList />} />
                <Route path="/customer" element={<Customer />} />
                <Route path='/categories' element={<Categories />} />
                <Route path='/counter' element={<Counter />} />
                <Route path='/products' element={<Products />} />
            </Routes>
        </Fragment>
    )
}

export default AppRoute